import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import fs from 'fs'
import clearRequire from 'clear-require'
import {loading, info} from 'prettycli'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import {resolve} from 'path'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import chokidar from 'chokidar'
import dependencyTree from 'dependency-tree'

import template from '../utils/template'
import entryPoints from '../utils/pages'
import config from './webpack.config'

/* generate dependency tree */
let tree = {}
const generateTree = files => files.map(file => tree[file] = dependencyTree.toList({
  filename: resolve(`./pages/${file}`),
  directory: '/'
}))

/* generate pages cache */
let pages = {}
const getPages = () => {
  const files = fs.readdirSync('./pages')
  files.filter(file => file.endsWith('.js')).filter(file => !file.endsWith('.test.js'))
  .map(file => pages[file.replace('.js', '')] = require(resolve(`./pages/${file}`)))
  generateTree(files)
}

loading('PAGES', 'Defining routes...')
getPages()

/* uncache dependency tree on change */
const uncache = path => {
  const roots = Object.keys(tree)
  roots.map(root => {
    /* find matching trees */
    const index = tree[root].indexOf(resolve(path))
    if (index !== -1) {
      /* get components up the tree */
      const stale = tree[root].slice(index)
      /* remove from require cache */
      stale.map(component => clearRequire(resolve(component)))
    }
  })
  getPages() // generate page cache again
}

const getInstance = config => {

  /* create an express instance */
  const instance = express()

  /* setup hot module replacement */

  const compiler = webpack(config)

  const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
  instance.use(devMiddleware)

  instance.use(webpackHotMiddleware(compiler))

  /* handle static files */
  instance.use('/static', express.static('static'))

  /* handle build files */
  instance.use('/build', express.static('.build/dist'))

  /* handle routes */
  instance.get('*', (req, res) => {
    let route = req.path.replace('/', '')

    /* default route */
    if (route === '') route = 'home'

    /* get page from cached pages */
    if (pages[route]) {
      const Page = pages[route].default

      /* get rendered component from ReactDOM */
      const component = renderToString(<Page/>)

      /* get styles */
      let styles
      try {
        /* This breaks when there are no styled-components in your code */
        styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
      } catch (error) {
        styles = ''
      }

      /* render html page */
      res.send(template(component, styles, route))
    } else res.status(404).end()
  })

  /* start the instance */
  const server = instance.listen(3000, () => {
    info('SERVER', 'Listening on 3000')
    loading('WATCH', 'Watching for changes...')
  })

  /* close instance */
  instance.close = callback => {
    /* close middleware */
    devMiddleware.close(() => {
      /* close http server */
      server.close()
      if (callback) callback()
    })
  }

  return instance
}

/* create server */
let server = getInstance(config)

/* replace server instance */
const replaceInstance = (config) => {
  /* close ongoing connections before replacing instance */
  server.close(() => {
    server = {}
    server = getInstance(config)
  })
}

/* define watchers */

chokidar.watch('**/*.js', {ignored: ['node_modules']})
.on('change', uncache).on('unlink', uncache)

const pageWatcher = chokidar.watch('pages/*.js').on('ready', () => {
  pageWatcher.on('add', () => {
    /* regenerate pages cache */
    getPages()

    /* get updated entry points */
    config.entry = entryPoints({hot: true})

    /* replace server instance */
    replaceInstance(config)
  })
})

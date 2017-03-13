import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import template from '../utils/template'
import fs from 'fs'
import clearRequire from 'clear-require'
import {loading, info} from 'prettycli'
import webpack from 'webpack'
import config from './webpack.config'
import {resolve} from 'path'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import chokidar from 'chokidar'

var dependencyTree = require('dependency-tree')

const compiler = webpack(config)

loading('PAGES', 'Defining routes...')
let pages = {}
let tree = {}

const generateTree = files => files.map(file => tree[file] = dependencyTree.toList({
  filename: resolve(`./pages/${file}`),
  directory: '/'
}))

const getPages = () => {
  const files = fs.readdirSync('./pages')
  files.filter(file => file.endsWith('.js'))
  .map(file => pages[file.replace('.js', '')] = require(resolve(`./pages/${file}`)))
  generateTree(files)
}
getPages()

const uncache = path => {
  const roots = Object.keys(tree)
  roots.map(root => {
    const index = tree[root].indexOf(resolve(path))
    if (index !== -1) {
      const stale = tree[root].slice(index)
      stale.map(component => clearRequire(resolve(component)))
    }
  })
  /* Create pages again */
  getPages()
}

let watcher = chokidar.watch('**/*.js', {ignored: 'node_modules'})
watcher.on('change', uncache).on('unlink', uncache)

const server = express()

server.use('/static', express.static('static'))
server.use('/build', express.static('.build/dist'))

server.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

server.use(require('webpack-hot-middleware')(compiler))

server.get('*', (req, res) => {
  let route = req.path
  if (route === '/') route = '/home'

  let page = route.replace('/', '')
  if (pages[page]) {
    const Page = pages[page].default
    const appString = renderToString(<Page/>)
    const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
    res.send(template(appString, styles, page))
  } else res.status(404).end()
})

server.listen(3000, () => {
  info('SERVER', 'Listening on 3000')
  loading('WATCH', 'Watching for changes...')
})

import express from 'express'
import React from 'react'
import {renderToString} from 'react/dist/react.min'
import fs from 'fs'
import compression from 'compression'
import webpack from 'webpack'
import {loading, info} from 'prettycli'
import {resolve} from 'path'
import styleSheet from 'styled-components/lib/models/StyleSheet'

import template from '../utils/template'
import config from './webpack.config'

loading('BUILD', 'Building...')

/* get webpack compiler */
const compiler = webpack(config)

/* compile! */
compiler.run(() => {

  loading('PAGES', 'Defining routes...')

  /* generate pages cache */
  let pages = {}
  const files = fs.readdirSync('./pages')
  files.filter(file => file.endsWith('.js')).filter(file => !file.endsWith('.test.js'))
  .map(file => pages[file.replace('.js', '')] = require(resolve(`./pages/${file}`)))

  /* create an express server */
  const server = express()

  /* gzip */
  server.use(compression())

  /* handle static files */
  server.use('/static', express.static('static'))

  /* handle build files */
  server.use('/build', express.static('.build/dist'))

  server.get('*', (req, res) => {
    let route = req.path.replace('/', '')

    const request = {
      path: req.path,
      query: req.query
    }

    /* default route */
    if (route === '') route = 'home'

    /* get page from cached pages */
    if (pages[route]) {
      const Page = pages[route].default

      const render = (asyncProps = {}) => {
        /* get rendered component from ReactDOM */
        const component = renderToString(<Page req={request} {...asyncProps}/>)

        /* get styles */
        let styles
        try {
          /* This breaks when there are no styled-components in your code */
          styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
        } catch (error) {
          styles = ''
        }

        const props = JSON.stringify(Object.assign({}, {req: request}, {...asyncProps}))
        /* render html page */
        res.send(template(component, styles, props, route))
      }

      /*
        If component has asyncComponentWillMount,
        fetch data and return it as props
      */
      if (Page.prototype.asyncComponentWillMount) {
        const pageInstance = new Page({req: request})
        pageInstance.asyncComponentWillMount()
        .then(asyncProps => render(asyncProps))
      } else render()

    } else res.status(404).end()
  })

  /* start the server */
  server.listen(3000, () => info('SERVER', 'Listening on 3000'))
})

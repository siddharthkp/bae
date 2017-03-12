import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import template from '../utils/template'
import fs from 'fs'
import compression from 'compression'
import webpack from 'webpack'
import config from './webpack.config'
import {loading, info} from 'prettycli'
import {resolve} from 'path'

const compiler = webpack(config)

loading('BUILD', 'Building...')
compiler.run(() => {
  loading('PAGES', 'Defining routes...')
  let pages = {}
  const files = fs.readdirSync('./pages')
  files.filter(file => file.endsWith('.js'))
  .map(file => pages[file.replace('.js', '')] = require(resolve(`./pages/${file}`)))

  const server = express()

  server.use(compression())
  server.use('/static', express.static('static'))
  server.use('/build', express.static('.build/dist'))

  server.get('*', (req, res) => {
    let route = req.path
    if (route === '/') route = '/home'

    let page = route.replace('/', '')
    if (pages[page]) {
      const Page = pages[page].default
      const appString = renderToString(<Page/>)
      res.send(template(appString, page))
    } else res.status(404).end()
  })

  server.listen(3000, () => info('SERVER', 'Listening on 3000'))
})

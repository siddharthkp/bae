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

const compiler = webpack(config)

loading('PAGES', 'Defining routes...')
let pages = {}
const files = fs.readdirSync('./pages')

files.filter(file => file.endsWith('.js'))
.map(file => pages[file.replace('.js', '')] = require(resolve(`./pages/${file}`)))

compiler.plugin('done', () => {
  files.map(file => {
    clearRequire(resolve(`./pages/${file}`))
    pages[file.replace('.js', '')] = require(resolve(`./pages/${file}`))
  })
})

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

#!/usr/bin/env node

const dev = process.argv[2] === 'dev'
if (!dev) process.env.NODE_ENV = 'production'

require('babel-core/register')({
  ignore: /node_modules\/(?!reaqt)/,
  presets: ['es2015', 'react'],
  plugins: ['transform-object-rest-spread']
})

if (dev) require('./dev/server')
else require('./prod/server')

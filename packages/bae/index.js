#!/usr/bin/env node

const dev = process.argv[2] === 'dev'
if (!dev) process.env.NODE_ENV = 'production'

require('babel-core/register')({
  ignore: /node_modules\/(?!bae)/,
  presets: ['es2015', 'react'],
  plugins: [
    'rapscallion/babel-plugin-server',
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    'transform-object-rest-spread'
  ]
})

if (dev) require('./dev/server')
else require('./prod/server')

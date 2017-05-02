import webpack from 'webpack'
import { resolve } from 'path'
import babelOptions from './babel.json'
import pages from '../utils/pages'

module.exports = {
  cache: true,
  entry: pages({ hot: true }),
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '.build/dist'),
    publicPath: '/build'
  },
  module: {
    rules: [{ test: /\.js?$/, loader: 'babel-loader', options: babelOptions }]
  },
  devtool: 'cheap-module-source-map',
  devServer: { hot: true },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}

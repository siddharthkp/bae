import webpack from 'webpack'
import babelOptions from './babel.json'
import pages from '../utils/pages'

const keys = Object.keys(pages)
keys.map(key => pages[key] = [pages[key], 'webpack-hot-middleware/client'])

module.exports = {
  cache: true,
  entry: pages,
  output: {filename: '[name].js', path: '.build/dist', publicPath: '/build'},
  module: {rules: [{test: /\.js?$/, loader: 'babel-loader', options: babelOptions}]},
  devtool: 'cheap-module-source-map',
  devServer: {hot: true},
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'common'}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}

import webpack from 'webpack'
import babelOptions from './babel.json'
import pages from '../utils/pages'

module.exports = {
  cache: true,
  entry: pages({hot: false}),
  output: {filename: '[name].js', path: '.build/dist'},
  module: {rules: [{test: /\.js?$/, loader: 'babel-loader', options: babelOptions}]},
  plugins: [
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'common'})
  ]
}

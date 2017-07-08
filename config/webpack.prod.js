/**
 * Created by root on 17-5-20.
 */
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].[hash].chunk.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      },
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false
      }
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets', to: 'assets'},
      {from: 'src/favicon.ico', to: 'favicon.ico'}
    ])
  ]
});

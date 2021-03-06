const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { host, port } = require('./server/config');
const webpackModule = require('./webpack.module');

const plugins = [
  new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: 'client/index.html',
    inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
  }),
  new ExtractCssChunks({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
];

module.exports = {
  target: 'web',

  mode: 'development',

  // Add hot reloading in development
  entry: [
    'react-hot-loader/patch', // This package already requires/loads react (but not react-dom). It must be loaded after babel-polyfill to ensure both react and react-dom use the same Symbol.
    'react', // Include this to enforce order
    'react-dom', // Include this to enforce order
    `webpack-hot-middleware/client?path=http://${host ||
      'localhost'}:${port}/__webpack_hmr`,
    'webpack/hot/only-dev-server',
    path.join(process.cwd(), 'client/index.js'),
  ],

  module: webpackModule,

  resolve: {
    extensions: ['.js'],
  },

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: path.resolve(process.cwd(), 'app'),
  },

  // Add development plugins
  plugins,

  // Emit a source map for easier debugging
  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
};

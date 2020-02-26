const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const production = process.env.NODE_ENV === 'production';

const plugins = [];

if (!production) {
  const CircularDependencyPlugin = require('circular-dependency-plugin'); // eslint-disable-line
  const NodemonPlugin = require('nodemon-webpack-plugin'); // eslint-disable-line

  plugins.push(
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    new NodemonPlugin({
      watch: path.resolve('./server'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  );
}

module.exports = {
  entry: path.resolve(__dirname, './server/index.js'),

  target: 'node',

  externals: [
    nodeExternals({
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                  useBuiltIns: 'entry',
                  corejs: {
                    version: 3,
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[local]-[contenthash:5]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./client/css/mixins.css'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
  },

  plugins,

  output: { path: path.join(__dirname, 'app'), filename: 'index.js' },

  devtool: production ? false : 'eval-source-map',
};

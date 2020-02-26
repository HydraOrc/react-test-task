const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: ExtractCssChunks.loader,
          options: {
            hot: process.env.NODE_ENV === 'development',
          },
        },
        {
          loader: 'css-loader',
          options: {
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
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            expandProps: 'end',
          },
        },
      ],
    },
  ],
};

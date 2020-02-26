/* eslint-disable global-require */
import fs from 'fs';
import { join, resolve } from 'path';
import express from 'express';
import { isDev } from '../config';
import addWebSocketMiddleware from '../websocket';

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  const { fileSystem } = middleware;
  const { outputPath } = compiler;

  const allRouteHandlers = (req, res) => {
    const file = fileSystem.readFileSync(join(outputPath, 'index.html'));

    const result = file.toString();

    res.send(result);
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  addWebSocketMiddleware(app);

  app.get('/', allRouteHandlers);
  app.get('/index.html', allRouteHandlers);
  app.get('*', allRouteHandlers);
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const compression = require('compression');
  const helmet = require('helmet');
  const hpp = require('hpp');

  const fileSystem = fs;
  const outputPath = options.outputPath || resolve(process.cwd(), 'app');
  const publicPath = options.publicPath || '/';

  let file;

  const allRouteHandlers = (req, res) => {
    file = file || fileSystem.readFileSync(join(outputPath, 'index.html'));

    const result = file.toString();

    res.send(result);
  };

  app.use(hpp());
  app.use(helmet({
    frameguard: false,
  }));
  app.use(compression());

  addWebSocketMiddleware(app);

  app.get('/', allRouteHandlers);
  app.get('/index.html', allRouteHandlers);

  app.use(publicPath, express.static(outputPath));

  app.get('*', allRouteHandlers);
};

export default function exports(app, options) {
  if (isDev) {
    const webpackConfig = require('../../webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  } else {
    addProdMiddlewares(app, options);
  }

  return app;
}

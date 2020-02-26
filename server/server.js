import path from 'path';
import express from 'express';
import logger from './logger';
import { port, host } from './config';

const { default: setup } = require('./middlewares/setup'); // eslint-disable-line

const { resolve } = path;

const app = express();

app.use(express.static('assets'));

setup(app, {
  outputPath: resolve(process.cwd(), 'app'),
  publicPath: '/',
});

const prettyHost = host || 'localhost';

app.listen(port, host, (err) => {
  if (err) {
    logger.error(err.message);

    return;
  }

  logger.appStarted(port, prettyHost);
});

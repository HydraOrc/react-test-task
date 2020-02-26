const argv = require('minimist')(process.argv.slice(2));
const isDev = process.env.NODE_ENV !== 'production';
const port = argv.port || process.env.PORT || 3003;
const customHost = argv.host || process.env.HOST;
const host = customHost || null;

const db = {
  host: 'localhost',
  database: 'finanalys',
  port: 13666,
};

module.exports.isDev = isDev;
module.exports.port = port;
module.exports.host = host;
module.exports.db = db;

exports = {
  isDev,
  port,
  host,
  db,
};

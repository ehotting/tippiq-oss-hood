import debugLogger from 'debug-logger';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.client.dev';

const debug = debugLogger('tippiq-hood:webpack:server-dev');

const host = 'localhost';
const port = process.env.PORT || 3006;

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const compiler = webpack(config);
const app = express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.listen(port, (err) => {
  if (err) {
    debug.error(err);
  } else {
    console.log('==> 🚧  Webpack development server listening on port %s', port); // eslint-disable-line no-console
    debug.info('==> 🚧  Webpack development server listening on port %s', port);
    debug.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  }
});

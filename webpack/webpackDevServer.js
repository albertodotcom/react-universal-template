/* eslint no-console: 0 */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConf from './webpack.config.babel.js';
import CONFIG from '../config.js';

let webpackDevConf = Object.assign({}, webpackConf);

const { HOSTNAME, PORT } = CONFIG;

webpackDevConf.entry.unshift(`webpack-dev-server/client?http://${HOSTNAME}:${PORT + 1}/`, 'webpack/hot/dev-server');

webpackDevConf.output.publicPath = `http://${HOSTNAME}:${PORT + 1}/`;

webpackDevConf.module.loaders = webpackDevConf.module.loaders.map(loader => {
  switch (loader.name) {
  case 'js':
    return {
      ...loader,
      loaders: [
        'react-hot',
        ...loader.loaders,
      ],
    };
  default:
    return loader;
  }
});

webpackDevConf.plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

let compiler = webpack(webpackDevConf);

let server = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  noInfo: true,
});

server.listen(PORT + 1, HOSTNAME, () => {
  console.info(`==> 💁  Webpack development server listening on "${HOSTNAME}:${PORT + 1}"`);
});
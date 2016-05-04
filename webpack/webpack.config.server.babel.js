import path from 'path';
import webpackClient from './webpack.config.client.babel.js';

let webpackServer = {
  ...webpackClient,
  target: 'node',
  entry: ['babel-polyfill', './src/server.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js',
  },
  cache: false,
  devtool: 'eval',
};

export default webpackServer;

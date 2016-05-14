import path from 'path';
import webpackClient from './webpack.config.client.babel.js';
import fs from 'fs';

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

let webpackServer = {
  ...webpackClient,
  target: 'node',
  entry: ['babel-polyfill', './src/server.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js',
  },
  devtool: 'eval',
  externals: nodeModules,
};

export default webpackServer;

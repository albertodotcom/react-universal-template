import path from 'path';
import webpackBase from './webpack.config.base.babel.js';
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
  ...webpackBase,
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

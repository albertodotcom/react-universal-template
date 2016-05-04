/* eslint no-console: 0 */

import 'babel-polyfill';
import _ from 'underscore';

import createClientDevServer from './webpack/webpackClientDevServer.js';

import webpackServerCompiler from './webpack/webpackServerCompiler.js';
import { fork } from 'child_process';

let nodeServer;
function compileAndRunNodeServer() {
  console.info('==> 💁  Compiling node server');
  webpackServerCompiler.run((err) => {
    if (err) return console.error(err);

    console.info('==> 💁  Starting node server');

    nodeServer && nodeServer.kill();
    nodeServer = fork('./dist/server.js');
  });
}

createClientDevServer(_.debounce(compileAndRunNodeServer, 100));

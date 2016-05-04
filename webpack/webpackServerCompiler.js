import webpack from 'webpack';
import webpackServerConfig from './webpack.config.server.babel.js';

let ServerCompiler = webpack(webpackServerConfig);

export default ServerCompiler;

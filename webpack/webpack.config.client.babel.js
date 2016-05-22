import webpackBase from './webpack.config.base.babel.js';

const webpackClient = {
  ...webpackBase,
  target: 'web',
};

export default webpackClient;

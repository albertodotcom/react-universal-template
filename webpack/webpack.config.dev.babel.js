import webpackConf from './webpack.config.babel.js';

let webpackDevConf = Object.assign({}, webpackConf);

webpackDevConf.output.publicPath = 'http://localhost:3001/';

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

export default webpackDevConf;

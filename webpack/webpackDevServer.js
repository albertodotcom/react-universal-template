import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConf from './webpack.config.babel.js';

let webpackDevConf = Object.assign({}, webpackConf);

webpackDevConf.entry.unshift('webpack-dev-server/client?http://localhost:3001/', 'webpack/hot/dev-server');

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

webpackDevConf.plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

let compiler = webpack(webpackDevConf);

let server = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  noInfo: true,
});
server.listen(3001);

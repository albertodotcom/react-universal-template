import path from 'path';

// ExtractTextPlugin => create a build is a separate file
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// css
import precss from 'precss';
import autoprefixer from 'autoprefixer';

export default {
  entry: ['babel-polyfill', './src/client.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        name: 'js',
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel?cacheDirectory'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        name: 'css',
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style','css!sass'),
      },
    ],
  },
  postcss: () => {
    return [precss, autoprefixer];
  },
  plugins: [
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('css', 'style.css'),
  ],
};

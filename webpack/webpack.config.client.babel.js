import path from 'path';
import webpack from 'webpack';

// ExtractTextPlugin => create a build is a separate file
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// css
import autoprefixer from 'autoprefixer';
import precss from 'precss';

export default {
  entry: ['babel-polyfill', './src/client.js'],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
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
        loader: ExtractTextPlugin.extract('style','css!postcss'),
      },
    ],
  },
  postcss: () => {
    return [
      precss,
      autoprefixer,
    ];
  },
  plugins: [
    new webpack.NoErrorsPlugin(),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('css', 'style.css'),
  ],
};

import path from 'path';

export default {
  entry: ['./src/client.js'],
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
        loaders: ['babel?cacheDirectory,presets[]=es2015,presets[]=react,presets[]=stage-0'],
      },
    ],
  },
};

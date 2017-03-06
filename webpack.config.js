
var path = require('path');

module.exports = {
  devtool: 'source-map',

  entry: './app/index.js',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'source-map-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      }
    ],
  },

  output: {
    path: path.resolve(__dirname, "static"),
    filename: 'cusku.js'
  }
};

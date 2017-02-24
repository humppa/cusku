
var path = require('path');

module.exports = {
  devtool: 'source-map',

  entry: './app/index.js',

  module: {

    preLoaders: [ {
      test: /\.jsx?$/,
      loader: 'source-map',
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'app')
    } ],

    loaders: [ {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'app')
    } ]
  },

  output: {
    path: path.resolve(__dirname, "static"),
    filename: 'cusku.js'
  }
};

var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'build/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: ['whatwg-fetch', APP_DIR + '/index.js'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader :'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  node: {
      fs: "empty",
      net: "empty",
      tls: "empty"
  }
};

module.exports = config;
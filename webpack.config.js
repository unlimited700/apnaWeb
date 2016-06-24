var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'build/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: ['whatwg-fetch',
      'webpack-hot-middleware/client',
      path.join(__dirname, '/src/index.js')],
  output: {
        path: path.join(__dirname, '/build/'),
        filename: '/bundle.js',
        publicPath: '/'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader :'babel',
        query: {
            presets: ['es2015', 'react'],
            cacheDirectory: '/tmp/'
        }
      },
        {
            test: /\.css?$/,
            loader: 'style.css'
        }
    ]
  },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
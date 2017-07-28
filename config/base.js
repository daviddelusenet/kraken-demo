const webpack = require('webpack');
const { resolve } = require('path');
const context = resolve(__dirname, './../src');

module.exports = function() {
  return {
    context,
    output: {
      path: resolve(__dirname, './../dist/js'), // `dist` is the destination,
      filename: '[name].min.js',
      publicPath: '/js'
    },
    module: {
      rules: [
        {
          test: /\.js$/, // Check for all js files
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
};

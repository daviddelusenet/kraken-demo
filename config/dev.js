const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base');
const { resolve } = require('path');

module.exports = function(env) {
  return webpackMerge(baseConfig(), {
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:3000',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './javascript/App.js'
        // the entry point of our app
      ]
    },
    devServer: {
      hot: true, // enable HMR on the server
      inline: true,
      contentBase: resolve(__dirname, './../dist'), // `__dirname` is root of the project
      publicPath: '/js',
      port: 3000
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 2
              }
            },
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally
      new webpack.NamedModulesPlugin()
      // prints more readable module names in the browser console on HMR updates
    ]
  })
};

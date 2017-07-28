const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base');
const { resolve } = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function(env) {
  return webpackMerge(baseConfig(), {
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:3100',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './javascript/App.js'
        // the entry point of our app
      ]
    },
    // stupid fix for Kraken bugs
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    devServer: {
      hot: true, // enable HMR on the server
      inline: true,
      contentBase: resolve(__dirname, './../dist'), // `__dirname` is root of the project
      publicPath: '/js',
      port: 3100
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
      new BrowserSyncPlugin({
        // BrowserSync options
        // browse to http://localhost:3000/ during development,
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:3100/'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }),
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin()
    ]
  })
};

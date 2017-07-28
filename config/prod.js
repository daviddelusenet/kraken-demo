const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
  return webpackMerge(baseConfig(), {
    entry: {
      app: './javascript/App.js'
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              },
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
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '../css/style.min.css',
        allChunks: true
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true,
          drop_console: false
        },
        comments: false
      })
    ]
  })
};

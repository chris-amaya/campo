const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i,
      parallel: true,
      sourceMap: true,
      extractComments: 'all',
      uglifyOptions: {
        warnings: false,
        arse: {},
        compress: {},
        mangle: true, // Note `mangle.properties` is `false` by default.
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false,
        output: {
          comments: false
        }
      }
    })],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
        { 
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
                attrs: ['img:src', 'link:href']
              }
            }
        },
        { 
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(handlebars|hbs)$/,
          loader: 'handlebars-loader',
          options: {
              knownHelpersOnly: false,
              // inlineRequires: /\(:?images|audio|video)/i,
              partialDirs: __dirname + '/frontend/partials',
              ignoreHelpers: false
          },
        },
        { 
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].css',
              },
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                  plugins: () => [autoprefixer()]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['./node_modules']
              }
            }]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ["@babel/plugin-transform-async-to-generator"],
                ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ]
              ],
            }
          },
        },
        {
          test: /\.(png|jpe?g|gif|jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '/img',
                publicPath: '/img',
              }

            },
            {
              // loader: 'file-loader',
              loader: 'image-webpack-loader',
              options: {
                // name: '[name].[ext]',
                bypassOnDebug: false, // webpack@1.x
                disable: false, // webpack@2.x and newer
                  mozjpeg: {
                    progressive: true,
                    quality: 65
                  },
                  // optipng.enabled: false will disable optipng
                  optipng: {
                    enabled: true,
                    quality: 65
                  },
                  pngquant: {
                    enabled:false,
                    quality: [0.65, 0.90],
                    speed: 1,
                    verbose: true
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  // the webp option will enable WEBP
                  webp: {
                    quality: 75
                  }
                }
      
              },
          ]
        }
        // { test: /\.jpg$/, use: [ "file-loader" ] }
    ]
},
  
  
});
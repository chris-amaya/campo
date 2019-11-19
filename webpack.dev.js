const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
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
          test: /\.css$/, use: ['style-loader', 'css-loader'], 
        },
        {
          test: /\.(handlebars|hbs)$/,
          loader: 'handlebars-loader',
          options: {
              knownHelpersOnly: false,
              // inlineRequires: /\(:?images|audio|video)/i,
              // inlineRequires: /\.(png|jpg|jpeg)/i,
              partialDirs: __dirname + '/frontend/partials',
              // precompileOptions: {
              //   knownHelpersOnly: false,
              // },
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
                publicPath: '/img'
              }
            },
          ]
        }
        // { test: /\.jpg$/, use: [ "file-loader" ] }
    ]
},
devtool: 'eval-source-map',
devServer: {
    contentBase: path.join(__dirname, 'frontend'),
    compress: true,
    port: 9000
  }

});
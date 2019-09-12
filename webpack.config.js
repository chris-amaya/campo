const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    entry: {
        index: './frontend/js/index.js',
        // app: './frontend/js/app.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist/')
    },    
    devServer: {
        port: 6000
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'index',
        template: './frontend/index.hbs',
        filename: 'index.hbs',

      }),
    ],

    module: {
        rules: [
            { 
              test: /\.(html|handlebars|hbs)$/i,
              use: {
                loader: 'html-loader',
                options: {
                    attrs: ['img:src']
                  }
                }},
            { 
              test: /\.css$/, use: ['style-loader', 'css-loader'], 
            },
            {
              test: /\.handlebars$/,
              loader: 'handlebars-loader',
              // options: {
              //     knownHelpersOnly: false,
              //     // inlineRequires: /\/assets\/(:?images|audio|video)\//ig,
              //     // partialDirs: [path.join(__dirname, './src/views/email/partials')],
              // },
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
              loader: 'babel-loader',
              query: {
                presets: ['@babel/preset-env'],
              },
            },
            {
              test: /\.(png|jpe?g|gif|jpg)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: '/img',
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
};
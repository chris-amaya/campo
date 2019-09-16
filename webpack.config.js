const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    entry: {
        index: './frontend/js/index.js',
        modal: './frontend/js/classes/modal.js',
        animations: './frontend/js/animations.js',
        categories: './frontend/js/categories.js',
        products: './frontend/js/products.js'
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
        chunks: ['index']

      }),
      new HtmlWebpackPlugin({
        title: 'categories',
        template: './frontend/categories.hbs',
        filename: 'categories.hbs',
        chunks: ['categories']
      }),
      new HtmlWebpackPlugin({
        title: 'products',
        template: './frontend/products.hbs',
        filename: 'products.hbs',
        chunks: ['products']
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
              test: /\.css$/, use: ['style-loader', 'css-loader'], 
            },
            {
              test: /\.(handlebars|hbs)$/,
              loader: 'handlebars-loader',
              options: {
                  // knownHelpersOnly: false,
                  // inlineRequires: /\(:?images|audio|video)/i,
                  inlineRequires: /\.(png|jpg|jpeg)/i,
                  partialDirs: __dirname + '/frontend/partials'
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
              loader: 'babel-loader',
              query: {
                presets: ['@babel/preset-env'],
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
};
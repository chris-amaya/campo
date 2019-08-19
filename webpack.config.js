const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
 // asdfoasidfjoasidoiasdjfoasd
module.exports = {
    entry: {
        // index: ['./frontend/index.html', ],
        index: './frontend/js/index.js',
        app: './frontend/js/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },    
    devServer: {
        port: 6000
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'index',
        template: './frontend/index2.hbs',
        filename: '../index.hbs',
        // inject: 'body',
        // chunks: ['app']

      }),
    ],

    module: {
        rules: [
            { test: /\.(html)$/,
                use: {
                  loader: 'html-loader',
                    options: {
                      attrs: [':data-src']
                  }
                }},
            { test: /\.css$/, use: ['style-loader', 'css-loader'], },
            // { test: /\.hbs$/, loader: "handlebars-loader" },
            {
              test: /\.handlebars$/,
              loader: 'handlebars-loader',
              // options: {
              //     knownHelpersOnly: false,
              //     // inlineRequires: /\/assets\/(:?images|audio|video)\//ig,
              //     // partialDirs: [path.join(__dirname, './src/views/email/partials')],
              // },
            },
            { test: /\.scss$/,
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
            }
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'frontend'),
        compress: true,
        port: 9000
      }
};
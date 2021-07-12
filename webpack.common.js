const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
      index: './frontend/js/index.js',
      modal: './frontend/js/classes/modal.js',
      animations: './frontend/js/animations.js',
      categories: './frontend/js/categories.js',
      products: './frontend/js/products.js',
      singleProduct: './frontend/js/singleProduct.js',
      login: './frontend/js/login',
      dashboard: './frontend/js/dashboard.js',
      userDashboard: './frontend/js/userDashboard.js',
      security: './frontend/js/security',
      profile: './frontend/js/profile.js',
      dashboardProducts: './frontend/js/dashboard.products.js',
      createProduct: './frontend/js/dashboard.create-product.js',
      editProduct: './frontend/js/dashboard.edit-product.js',
      _categoria: './frontend/js/categoria.js',
      avisoPrivacidad: './frontend/js/legal/aviso-privacidad.js',
      cookies: './frontend/js/legal/cookies.js',
      termsAndConditions: './frontend/js/legal/terms-and-conditions.js',
      files: './frontend/js/common/files.common.js'
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
    new HtmlWebpackPlugin({
      title: 'singleProduct',
      template: './frontend/singleProduct.hbs',
      filename: 'singleProduct.hbs',
      chunks: ['singleProduct']
    }),
    new HtmlWebpackPlugin({
      title: 'login',
      template: './frontend/login.hbs',
      filename: 'login.hbs',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      title: 'dashboard',
      template: './frontend/dashboard/dashboard.hbs',
      filename: 'dashboard.hbs',
      chunks: ['dashboard']
    }),
    new HtmlWebpackPlugin({
      title: 'user',
      template: './frontend/dashboard/user.hbs',
      filename: 'user.hbs',
      chunks: ['userDashboard']
    }),
    new HtmlWebpackPlugin({
      title: 'security',
      template: './frontend/dashboard/security.hbs',
      filename: 'security.hbs',
      chunks: ['security']
    }),
    new HtmlWebpackPlugin({
      title: 'profile',
      template: './frontend/dashboard/profile.hbs',
      filename: 'profile.hbs',
      chunks: ['profile']
    }),
    new HtmlWebpackPlugin({
      title: 'dashboard-products',
      template: './frontend/dashboard/dashboard.products.hbs',
      filename: 'dashboard.products.hbs',
      chunks: ['dashboardProducts']
    }),
    new HtmlWebpackPlugin({
      title: 'create-product',
      template: './frontend/dashboard/dashboard.create-product.hbs',
      filename: 'dashboard.create-product.hbs',
      chunks: ['createProduct']
    }),
    new HtmlWebpackPlugin({
      title: 'edit-product',
      template: './frontend/dashboard/dashboard.edit-product.hbs',
      filename: 'dashboard.edit-product.hbs',
      chunks: ['editProduct']
    }),
    new HtmlWebpackPlugin({
      title: 'categoria',
      template: './frontend/categoria.hbs',
      filename: 'categoria.hbs',
      chunks: ['_categoria']
    }),
    new HtmlWebpackPlugin({
      title: 'aviso de privacidad',
      template: './frontend/aviso-privacidad.hbs',
      filename: 'aviso-privacidad.hbs',
      chunks: ['avisoPrivacidad']
    }),

    new HtmlWebpackPlugin({
      title: 'cookies',
      template: './frontend/cookies.hbs',
      filename: 'cookies.hbs',
      chunks: ['cookies']
    }),

    new HtmlWebpackPlugin({
      title: 'termsAndConditions',
      template: './frontend/terms-and-conditions.hbs',
      filename: 'terms-and-conditions.hbs',
      chunks: ['termsAndConditions']
    }),

  ]};
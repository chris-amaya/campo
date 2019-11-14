const express = require("express");
const productController = require('../controllers/product.controller');
const { checkToken, validateADMIN, validateUser } = require('../middlewares/auth.middleware')
const app = express.Router();

app.get('/api/product/last-products', productController.getLastProducts)
app.get('/api/product/:url', productController.getProductByURL)
app.post('/api/product/live-search', productController.liveSearch);
app.post('/api/product/create/', productController.createProduct);
app.post('/api/products/:page', [checkToken, validateUser], productController.getProductByUser);
app.post('/api/product/:id', [checkToken], productController.getProductByID);
app.post('/api/product/delete-img/:id', [checkToken, validateUser], productController.deleteImgByID);
app.post('/api/product/edit-product/:id', [checkToken, validateUser], productController.editProduct);




module.exports = app;
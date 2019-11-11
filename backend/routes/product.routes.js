const express = require("express");
const productController = require('../controllers/product.controller');
const { checkToken, validateADMIN, validateUser } = require('../middlewares/auth.middleware')
const app = express.Router();

app.post('/api/product/create/', checkToken, productController.createProduct);
app.post('/api/products/', [checkToken, validateUser], productController.getProductByUser);
app.post('/api/product/:id', [checkToken], productController.getProductByID);
app.post('/api/product/delete-img/:id', [checkToken, validateUser], productController.deleteImgByID);
app.post('/api/product/edit-product/:id', [checkToken, validateUser], productController.editProduct)




module.exports = app;
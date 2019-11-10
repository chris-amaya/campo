const express = require("express");
const productController = require('../controllers/product.controller');
const { checkToken, validateADMIN, validateUser } = require('../middlewares/auth.middleware')
const app = express.Router();

app.post('/api/product/create/', checkToken, productController.createProduct);
app.post('/api/products/', [checkToken, validateUser], productController.getProductByUser);






module.exports = app;
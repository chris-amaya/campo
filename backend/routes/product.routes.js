const express = require("express");
const productController = require('../controllers/product.controller');
const { checkToken, validateADMIN } = require('../middlewares/auth.middleware')
const app = express.Router();

app.post('/api/product/create/', checkToken, productController.createProduct);





module.exports = app;
const express = require("express");
const categoryController = require('../controllers/category.controller');
const { checkToken, validateADMIN, validateUser } = require('../middlewares/auth.middleware')
const app = express.Router();

app.post('/api/category/create/', [checkToken], categoryController.createCategory);
app.get('/api/categories', categoryController.getCategories)
app.get('/api/category/:category', categoryController.getProductsByCategory);
app.get('/api/category/:category/:page', categoryController.getProductsByCategory)

module.exports = app;
const express = require("express");
const categoryController = require('../controllers/category.controller');
const { checkToken, validateADMIN, validateUser } = require('../middlewares/auth.middleware')
const app = express.Router();

app.post('/api/category/create/', [checkToken], categoryController.createCategory);


module.exports = app;
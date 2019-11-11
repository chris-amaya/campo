const express = require("express");
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const tokenMiddleware = require('../middlewares/auth.middleware');
const { checkToken, validateADMIN, validateUser } = require('../middlewares/auth.middleware')
const app = express.Router();

app.post('/api/user/signUp/', userController.userSignUp);
app.get('/api/user/email/:email', userController.checkEmail);
app.post('/api/login', userController.login)
app.get('/api/user/product/:url', [checkToken], productController.getUserByProductURL );
app.post('/api/user/refresh-token/', tokenMiddleware.refreshToken)



app.get('/user/example', userController.example)






module.exports = app;
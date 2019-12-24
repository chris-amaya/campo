const express = require("express");
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const tokenMiddleware = require('../middlewares/auth.middleware');
const { checkToken, validateADMIN, validateUser } = require('../middlewares/auth.middleware')
const app = express.Router();

app.post('/api/user/signUp/', userController.userSignUp);
app.get('/api/user/check-token', tokenMiddleware.onlyCheckToken)
app.get('/api/user/email/:email', userController.checkEmail);
app.post('/api/login', userController.login);
// app.post('/google', userController.google);
app.post('/google-verify', userController.googleVerify);
app.get('/api/user/profile/:url', userController.profile);
app.get('/api/user/:url', userController.getUserInfo);
app.post('/api/user/update-password', [checkToken], userController.updatePassword)
app.post('/api/user/edit/', userController.editUserInfo);
app.get('/api/user/product/:url', [checkToken], productController.getUserByProductURL );
app.post('/api/user/refresh-token/', tokenMiddleware.refreshToken)



app.get('/user/example', userController.example)






module.exports = app;
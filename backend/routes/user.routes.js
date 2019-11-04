const express = require("express");
const userController = require('../controllers/user.controller');
const tokenMiddleware = require('../middlewares/auth.middleware');
const app = express.Router();

app.post('/api/user/signUp/', userController.userSignUp);
app.get('/api/user/email/:email', userController.checkEmail);
app.post('/api/login', userController.login)
app.post('/api/user/refresh-token/', tokenMiddleware.refreshToken)



app.get('/user/example', userController.example)






module.exports = app;
const express = require("express");
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/categorias', (req, res) => {
    res.render('categories');
});

app.get('/productos', (req, res) => {
    res.render('products');
})


module.exports = app;
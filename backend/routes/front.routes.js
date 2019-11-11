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

app.get('/producto/:id', (req, res) => {
    res.render('singleProduct');
})

app.get('/producto', (req, res) => {
    res.render('singleProduct');
})

app.get('/acceso', (req, res) => {
    res.render('login');
})




module.exports = app;
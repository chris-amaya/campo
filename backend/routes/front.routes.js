const express = require("express");
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/categorias', (req, res) => {
    res.render('categories');
});

app.get('/categoria/:categoria', (req, res) => {
    res.render('categoria');
});

app.get('/categoria/:categoria/:page', (req, res) => {
    res.render('categoria');
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

app.get('/perfil/:url', (req, res) => {
    res.render('profile')
})



module.exports = app;
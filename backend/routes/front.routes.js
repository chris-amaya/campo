const express = require("express");
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
});

app.get('/categorias', (req, res) => {
    res.render('categories', {
        title: 'Categorias'
    });
});

app.get('/categoria/:categoria', (req, res) => {
    res.render('categoria', {
        title: `${req.params.categoria}`
    });
});

app.get('/categoria/:categoria/:page', (req, res) => {
    res.render('categoria',  {
        title: `${req.params.categoria}`
    });
});

app.get('/productos', (req, res) => {
    res.render('products');
})

app.get('/producto/:id', (req, res) => {
    console.log(req.params.id)
    res.render('singleProduct', {
        // title: req.params.id
        title: 'asdfasfd'
    });
})

app.get('/producto', (req, res) => {
    res.render('singleProduct');
})

app.get('/acceso', (req, res) => {
    res.render('login');
})

app.get('/perfil/:url', (req, res) => {
    res.render('profile', {
        title: `${req.params.url}`
    })
})

app.get('/aviso-de-privacidad', (req, res) => {
    res.render('aviso-privacidad')
})

app.get('/cookies', (req, res) => {
    res.render('cookies')
})

app.get('/terminos-y-condiciones', (req, res) => {
    res.render('terms-and-conditions')
})



module.exports = app;
const express = require("express");
const app = express.Router();

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

app.get('/dashboard/user', (req, res) => {
    res.render('user')
});

app.get('/dashboard/seguridad', (req, res) => {
    res.render('security')
});


app.get('/usuario/:usuario/', (req, res) => {
    res.render('profile', {
        usuario: req.params.usuario
    })
})

app.get('/dashboard/productos/', (req, res) => {
    res.render('dashboard.products.hbs')
})

app.get('/dashboard/productos/:page', (req, res) => {
    res.render('dashboard.products.hbs')
})

app.get('/dashboard/crear-producto/', (req, res) => {
    res.render('dashboard.create-product.hbs')
})

app.get('/dashboard/producto/editar/:id', (req, res) => {
    res.render('dashboard.edit-product.hbs', {})
})




module.exports = app;
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

app.get('/perfil', (req, res) => {
    res.render('profile')
})

app.get('/usuario/:usuario/', (req, res) => {
    res.render('profile', {
        usuario: req.params.usuario
    })
})




module.exports = app;
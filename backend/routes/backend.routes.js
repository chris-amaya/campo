const express = require("express");
const app = express.Router();

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

app.get('/dashboard/user', (req, res) => {
    res.render('user')
});




module.exports = app;
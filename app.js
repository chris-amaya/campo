const hbs     = require('hbs');
const path    = require('path');
const bodyParser = require("body-parser");
const express = require('express');
const app     = express();

app.use((req, res, next) => {
    console.log('%s %s', req.method, req.url);
    next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CARGANDO RUTAS
// const usersRoute   = require('./backend/routes/users.route');
// const adminRoute   = require('./backend/routes/admin.route');
// const imgRoute     = require('./backend/routes/img.route');
// const recetasRoute = require('./backend/routes/recetas.route');

/*=============================================
CABECERAS HTTP
=============================================*/

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Allow", "GET, POST, PUT, DELETE");
    next();
  });

const pub_dir = `${__dirname}/dist`;
// const pub_img = `${__dirname}/uploads`;

app.set('views', __dirname + '/dist');
hbs.registerPartials(__dirname + '/frontend/partials');
app.set('view engine', 'hbs');
app.use(express.static(pub_dir));

app.get('/', (req, res) => {
  res.render('index')
})

// app.get('/prueba', (req, res) => {
//   res.render('prueba')
// })

app.get('/prueba',function(req,res){
  res.sendFile(path.join(__dirname+'/dist/prueba.html'));
});

// app.use('/uploads', express.static(pub_img));
// app.use(usersRoute);
// app.use(adminRoute);
// app.use(imgRoute);
// app.use(recetasRoute);


module.exports = app;
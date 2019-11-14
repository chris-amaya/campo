// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 5000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'MODE_DEV';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
// process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;
process.env.TOKEN_EXPIRATION = '7d'


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'MODE_DEV') {
    urlDB = 'mongodb://localhost:27017/campo';
} else {
    // urlDB = process.env.MONGO_URI;
    urlDB = 'mongodb+srv://chris:BYjVrkD9idB6Y1k3@cluster0-tr0lj.mongodb.net/test?retryWrites=true&w=majority'
    // mongodb+srv://chris:<password>@cluster0-tr0lj.mongodb.net/test?retryWrites=true&w=majority
    // mongodb+srv://chris:<password>@cluster0-tr0lj.mongodb.net/test?retryWrites=true&w=majority
}

process.env.URLDB = urlDB;

// ============================
//  Google Client ID
// ============================
// process.env.CLIENT_ID = process.env.CLIENT_ID || '219758474264-vh1bibcphgvbc32km508lubtqkanikf1.apps.googleusercontent.com';

// Google Client ID
// 894220436027-6kf0tnl8ep8p1vms7oe9a7rm4oocfn3i.apps.googleusercontent.com

// Google Client Secret
// -bEMFS6gFW1mYrKM3_tLXwje


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://chris:<password>@cluster0-tr0lj.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

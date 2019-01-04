//=======================
// Puerto
//=======================


process.env.PORT = process.env.PORT || 3000;

//=======================
// Entorno
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=======================
// Base de datos
//=======================
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {

    urlDB = 'mongodb://kpote17:kpote17@ds017155.mlab.com:17155/cafe17';
}


process.env.URLDB = urlDB;
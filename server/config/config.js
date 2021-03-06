//=======================
// Puerto
//=======================


process.env.PORT = process.env.PORT || 3000;

//=======================
// Entorno
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================
// Vencimiento del token
//=======================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//=======================
// SEED de autenticacion
//=======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//=======================
// Base de datos
//=======================
let urlDB;

//=======================
// Google Client ID
//=======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '850970764127-bnkuebf2u8vo6mrprr13h0e4jpcrn07m.apps.googleusercontent.com';


if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {

    urlDB = process.env.MONGO_URI;
}


process.env.URLDB = urlDB;
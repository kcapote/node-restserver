require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//Configuracion global de rutas
app.use(require('./routes/index'));


//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));



mongoose.connect(process.env.URLDB, (err, resp) => {
    if (err) throw err;

    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});
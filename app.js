//Requires
const express = require('express');
const mongoose = require('mongoose');
//Inicializar variables;

const app = express();

//Rutas

app.use(require('./routes/prueba'));


//Conexion a la base de datos

mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m','online');
})



//Escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online')
})
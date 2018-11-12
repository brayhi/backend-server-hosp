//Requires
const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/index');
const usuarioRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');
const bodyParser = require('body-parser');
const hospRoutes = require('./routes/hospital');
//Inicializar variables;

const app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//Conexion a la base de datos

mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m','online');
})

//Rutas

app.use('/', appRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospRoutes);
//Escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online')
})
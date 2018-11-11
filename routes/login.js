const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const Usuario = require('../models/usuario');


app.post('/', (req, res) => {

    let body = req.body;

    Usuario.findOne({
        email: body.email
    }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Credenciales incorrectas - password'
                }
            });
        }

        // Crear un token!!!
        let token = jwt.sign({
            usuario: usuarioDB
        }, '@este-es@-un-seed-dificil', {expiresIn: 14400})  // 4 horas

        return res.status(200).json({
            ok: true,
            usuario:usuarioDB,
            token
        })

    })



})









module.exports = app;
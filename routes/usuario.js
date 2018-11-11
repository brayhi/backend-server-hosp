const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const {verificaToken} = require('../middlewares/authentication');


const app = express();

const Usuario = require('../models/usuario');

app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre email img role')
        .exec((err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                })
            }
            return res.status(200).json({
                ok: true,
                usuarioDB
            });
        })


});

// ========================================
// Crear un usuario
// ========================================

app.post('/', verificaToken, (req, res, next) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                error: err
            });
        }
        return res.status(201).json({
            ok: true,
            usuario: usuarioDB
        });
    });


});

// ========================================
// Actualizar usuario
// ========================================
app.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
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
                mensaje: `El usuario con el id ${id} no existe`,
                errors: {

                }
            })
        }

        return res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No exite un usuario con ese id',
                errors: {
                    message: 'No exite un usuario con ese id'
                }
            });
        }
        return res.status(200).json({
            ok:true,
            usuario: usuarioBorrado
        })
    })
})

module.exports = app;
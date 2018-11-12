const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/authentication');
const app = express();
const Hospital = require('../models/hospital');

// ========================================
// Obtener hospitales
// ========================================

app.get('/', (req, res) => {

    Hospital.find({})
        .populate('usuario', 'nombre')
        .exec((err, hospitalDB) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    error: err
                });
            }

            return res.status(200).json({
                ok: true,
                hospitales: hospitalDB
            })
        })
});

// ========================================
// Crear hospital
// ========================================

app.post('/', verificaToken,(req, res) => {
    let body = req.body;
    let hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    hospital.save((err, hospitalDB) => {
        if (err){
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        return res.status(200).json({
            ok:true,
            hospital: hospitalDB
        });
    });
})

module.exports = app;
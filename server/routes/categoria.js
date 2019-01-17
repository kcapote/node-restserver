const express = requiere('express');

let { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


//===============================
// Mostrar todas las categorias
//================================
app.get('/categoria', (req, res) => {
    Categoria.find()
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.count({}, (err, total) => {
                res.json({
                    ok: true,
                    categorias,
                    total
                });
            });
        });
});



//===============================
// Mostrar una categoria por id
//================================
app.get('/categoria/:id', (req, res) => {
    //Categoria.findById()
    let id = req.params.id;

    Categoria.findById(id).exec((err, categoria) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria
        });


    })




});



//===============================
// Crear una nueva categoria
//================================
app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    //req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });



});



//===============================
// Actualizar categoria
//================================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findOneAndUpdate




});


//===============================
// Actualizar categoria
//================================
app.delete('/categoria/:id', verificaToken, (req, res) => {
    // solo admin borra categorias
    // Categoria.findByIdAndRemove


});



module.exports = app;
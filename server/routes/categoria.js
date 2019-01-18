const express = require('express');

let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


//===============================
// Mostrar todas las categorias
//================================
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find()
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
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
app.get('/categoria/:id', verificaToken, (req, res) => {
    //Categoria.findById()
    let id = req.params.id;

    Categoria.findById(id).exec((err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoria) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
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
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
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
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }


        res.json({
            ok: true,
            categoria: categoriaDB
        })


    });

});


//===============================
// Elimina categoria
//================================
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    // solo admin borra categorias
    // Categoria.findByIdAndRemove
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoria no encontrada"
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada,
            message: 'Categoria borrada'

        })


    });




});



module.exports = app;
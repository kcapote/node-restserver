const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');


let app = express();
let Producto = require('../models/producto');


//=================================
//Obtener productos
//==================================
app.get('/productos', verificaToken, (req, res) => {
    //trae todos los productos
    //populate usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });


});


//=================================
//Obtener un producto por ID
//==================================
app.get('/productos/:id', verificaToken, (req, res) => {
    //populate usuario categoria
    let id = req.params.id;

    Producto.findById(id)
        .where({ disponible: true })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });

        });

});



//=================================
//Buscar productos
//==================================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');


    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productos
            });

        })

})


//=================================
//Crear un producto 
//==================================
app.post('/productos', verificaToken, (req, res) => {
    //grabar un usuario
    //grabar una categoria
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });


    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })


    });


});

//=================================
//Actualiza el producto 
//==================================
app.put('/productos/:id', verificaToken, (req, res) => {
    //grabar un usuario
    //grabar una categoria
    let id = req.params.id;

    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;


        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            res.json({
                ok: true,
                producto: productoGuardado
            });

        })

    })


    // let producto = {
    //     nombre: body.nombre,
    //     precioUni: body.precioUni,
    //     descripcion: body.descripcion,
    //     categoria: body.categoria,
    // };




    // Producto.findByIdAndUpdate(id, producto, { new: true, runValidators: true }, (err, productoDB) => {
    //     if (err) {
    //         return res.status(500).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!productoDB) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'El producto no existe'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         producto: productoDB
    //     });


    // });



});


//=================================
//Borrar un producto 
//==================================
app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let proDis = {
        disponible: false
    }

    Producto.findOneAndUpdate({ _id: id }, proDis, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    })



});


module.exports = app;
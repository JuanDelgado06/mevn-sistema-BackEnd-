import models from '../models'

async function aumentarStock(idArticulo, cantidad) {

    let {stock} = await models.Articulo.findOne({_id:idArticulo});
    let nuevoStock = parseInt(stock) + parseInt( cantidad);
    const reg = await models.Articulo.findOneAndUpdate({ _id:idArticulo }, {stock: nuevoStock});

}

async function disminuirStock(idArticulo, cantidad) {

    let {stock} = await models.Articulo.findOne({_id:idArticulo});
    let nuevoStock = parseInt(stock) - parseInt( cantidad);
    const reg = await models.Articulo.findOneAndUpdate({ _id:idArticulo }, {stock: nuevoStock});

}

export default {
    add : async (req, res, next) => {
        try {
            const reg = await models.Venta.create(req.body);
            //Actualizar Stock
            let detalles = req.body.detalles
            detalles.map(function(x) {
                disminuirStock(x._id, x.cantidad)
            })

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    query : async (req, res, next) => {
        try {
            const reg=await models.Venta.findOne({ _id:req.query._id })
            .populate('usuario', {nombre: 1})
            .populate('persona', {nombre: 1, direccion:1, num_documento:1, telefono:1, email:1}) ;
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    list : async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg=await models.Venta.find(
                    { $or: [ {'num_comprobante' :  new RegExp(valor, 'i')}, {'serie_comprobante' : new RegExp(valor, 'i')} ] })
                    .populate('usuario', {nombre: 1})
                    .populate('persona', {nombre: 1}) 
                    .sort({'creadoAt' : -1})
                    res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    // update : async (req, res, next) => {
    //     try {
    //         const reg = await models.Venta.findByIdAndUpdate({_id:req.body._id}, {nombre:req.body.nombre, descripcion:req.body.descripcion})
    //         res.status(200).json(reg);
    //     } catch (e) {
    //         res.status(500).send({
    //             message: 'Ocurrio un error'
    //         });
    //         next(e);
    //     }
    // },
    // remove : async (req, res, next) => {
    //     try {
    //         const reg = await models.Venta.findByIdAndDelete({_id:req.body._id});
    //         res.status(200).json(reg);
    //     } catch (e) {
    //         res.status(500).send({
    //             message: 'Ocurrio un error'
    //         });
    //         next(e);
    //     }
    // },
    active : async (req, res, next) => {
        try {
            const reg = await models.Venta.findByIdAndUpdate({_id:req.body._id}, {estado:1});
            
            let detalles = reg.detalles
            detalles.map(function(x) {
                disminuirStock(x._id, x.cantidad)
            })

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    deactive : async (req, res, next) => {
        try {
            const reg = await models.Venta.findByIdAndUpdate({_id:req.body._id}, {estado:0});

            let detalles = reg.detalles
            detalles.map(function(x) {
                aumentarStock(x._id, x.cantidad)
            })

            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    grafico12Meses: async(req,res,next) => {
        try {
            const reg = await models.Venta.aggregate(
                [
                    {
                        $group: {
                            _id: {
                                mes: {$month: "$creadoAt"},
                                año: {$year: "$creadoAt"}
                            },
                            total: {$sum: "$total"},
                            numero_ventas: {$sum:1}
                        }
                    },
                    {
                        $sort: {
                            "_id.year":-1, "_id.mes": -1
                        }
                    }
                ]
            ).limit(12);
            
            res.status(200).json(reg);

        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    consultaFechas : async (req, res, next) => {
        try {
            let start = req.query.start;
            let end = req.query.end;
            const reg=await models.Venta.find(
                    {"creadoAt" : {"$gte" : start, "$lt" : end} } )
                    .populate('usuario', {nombre: 1})
                    .populate('persona', {nombre: 1}) 
                    .sort({'creadoAt' : -1})
                    res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
}
import tokenService from '../services/token'

export default {

    verificarUsuario : async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No existe el token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if ( response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero' ) {
            next()
        } else {
            return res.status(403).send({
                message : 'El usuario no esta autorizado'
            })
        }
    },
    verificarAdministrador : async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No existe el token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if ( response.rol == 'Administrador' ) {
            next()
        } else {
            return res.status(403).send({
                message : 'El usuario no esta autorizado'
            })
        }
    },
    verificarAlmacenero : async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No existe el token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if (response.rol == 'Administrador' || response.rol == 'Almacenero' ) {
            next()
        } else {
            return res.status(403).send({
                message : 'El usuario no esta autorizado'
            })
        }
    },
    verificarVendedor : async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No existe el token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if ( response.rol == 'Administrador' || response.rol == 'Vendedor' ) {
            next()
        } else {
            return res.status(403).send({
                message : 'El usuario no esta autorizado'
            })
        }
    },

}
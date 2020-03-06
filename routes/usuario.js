import routerx from 'express-promise-router'
import usuarioController from '../controllers/UsuarioController'
import auth from '../middlewares/auth'

const router = routerx();

router.post('/add', auth.verificarAdministrador , usuarioController.add);

router.get('/query',auth.verificarAdministrador, usuarioController.query);

router.get('/list', auth.verificarAdministrador,  usuarioController.list);

router.put('/update', auth.verificarAdministrador,  usuarioController.update);

router.delete('/remove', auth.verificarAdministrador,  usuarioController.remove);

router.put('/activate', auth.verificarAdministrador, usuarioController.active);

router.put('/deactivate', auth.verificarAdministrador,  usuarioController.deactive);

router.post('/login', usuarioController.login);


export default  router;
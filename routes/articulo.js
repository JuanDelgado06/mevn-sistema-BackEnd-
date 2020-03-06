import routerx from 'express-promise-router'
import articuloController from '../controllers/ArticuloController'
import auth from '../middlewares/auth'

const router = routerx();

router.post('/add', auth.verificarAlmacenero, articuloController.add);

router.get('/query', auth.verificarAlmacenero, articuloController.query);
router.get('/queryCodigo', auth.verificarUsuario, articuloController.queryCodigo);

router.get('/list', auth.verificarAlmacenero, articuloController.list);

router.put('/update', auth.verificarAlmacenero, articuloController.update);

router.delete('/remove', auth.verificarAlmacenero, articuloController.remove);

router.put('/activate', auth.verificarAlmacenero, articuloController.active);

router.put('/deactivate', auth.verificarAlmacenero, articuloController.deactive);

export default  router;
import routerx from 'express-promise-router'
import ingresoController from '../controllers/IngresoController'
import auth from '../middlewares/auth'

const router = routerx();

router.post('/add', auth.verificarAlmacenero, ingresoController.add);

router.get('/query', auth.verificarAlmacenero, ingresoController.query);

router.get('/list', auth.verificarAlmacenero, ingresoController.list);

router.get('/grafico12meses', auth.verificarUsuario, ingresoController.grafico12Meses);

router.get('/consultaFechas', auth.verificarUsuario, ingresoController.consultaFechas);


// router.put('/update', auth.verificarAlmacenero, ingresoController.update);

// router.delete('/remove', auth.verificarAlmacenero, ingresoController.remove);

router.put('/activate', auth.verificarAlmacenero, ingresoController.active);

router.put('/deactivate', auth.verificarAlmacenero, ingresoController.deactive);

export default  router;
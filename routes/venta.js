import routerx from 'express-promise-router'
import ventaController from '../controllers/VentaController'
import auth from '../middlewares/auth'

const router = routerx();

router.post('/add', auth.verificarVendedor, ventaController.add);

router.get('/query', auth.verificarVendedor, ventaController.query);

router.get('/list', auth.verificarVendedor, ventaController.list);

router.get('/grafico12meses', auth.verificarUsuario, ventaController.grafico12Meses);

router.get('/consultaFechas', auth.verificarUsuario, ventaController.consultaFechas);

// router.put('/update', auth.verificarVendedor, ventaController.update);

// router.delete('/remove', auth.verificarVendedor, ventaController.remove);

router.put('/activate', auth.verificarVendedor, ventaController.active);

router.put('/deactivate', auth.verificarVendedor, ventaController.deactive);

export default  router;
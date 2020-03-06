import routerx from "express-promise-router";
import categoriaController from "../controllers/CategoriaController";
import auth from "../middlewares/auth";

const router = routerx();

router.post('/add', auth.verificarAlmacenero, categoriaController.add);
// router.post("/add", categoriaController.add);

router.get("/query", auth.verificarAlmacenero, categoriaController.query);

router.get('/list', auth.verificarAlmacenero, categoriaController.list);
// router.get("/list", categoriaController.list);

router.put('/update', auth.verificarAlmacenero, categoriaController.update);
// router.put("/update", categoriaController.update);

router.delete("/remove", auth.verificarAlmacenero, categoriaController.remove);

router.put("/activate", auth.verificarAlmacenero, categoriaController.active);
// router.put("/activate", categoriaController.active);

router.put("/deactivate",auth.verificarAlmacenero, categoriaController.deactive);
router.put("/deactivate", categoriaController.deactive);

export default router;

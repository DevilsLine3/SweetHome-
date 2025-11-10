import express from 'express';
import productoController from '../controllers/productoC.js'
import { verificarToken } from '../helpers/autentificacion.js';

const route = express.Router();

//publicas
// Rutas específicas antes de rutas con parámetros para evitar capturas indeseadas
route.get("/mis/misproductos", verificarToken, productoController.getByUsuario);
route.get("/:id", productoController.getOne);
route.get("/", productoController.getAll);
//privadas
route.post("/", verificarToken, productoController.create);
route.put("/:id", verificarToken, productoController.update);
route.delete("/:id", verificarToken, productoController.delete);

export default route;
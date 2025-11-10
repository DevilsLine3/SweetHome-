import express from 'express';
import { categoriaController } from '../controllers/categoriaC.js';
import { verificarToken } from '../helpers/autentificacion.js';


const router = express.Router();

// Ruta publica
router.get("/", categoriaController.getAll);

// Rutas privadas
router.post("/",verificarToken,categoriaController.create);
router.put("/:id",verificarToken,categoriaController.update);
router.patch("/:id/estado", verificarToken,categoriaController.cambiarEstado);

export default router;















import express from 'express';
import usuarioController from '../controllers/usuarioC.js'
import { verificarToken } from '../helpers/autentificacion.js';

const route = express.Router();

//Publicas
route.post('/register',usuarioController.register);
route.post('/login',usuarioController.login)

//Privadas
route.get('/:id', verificarToken, usuarioController.getOne);
route.get('/', verificarToken, usuarioController.getAll)
route.put('/:id', verificarToken, usuarioController.update)
route.delete('/:id', verificarToken, usuarioController.delete);
route.get("/:id/whatsapp", verificarToken,usuarioController.getWhatsAppLink);

export default route;
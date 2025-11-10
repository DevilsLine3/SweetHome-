import express from "express";
import pedidoController from "../controllers/pedidoC.js";
import { verificarToken } from "../helpers/autentificacion.js";

const route = express.Router();

// Usuario
route.post("/", verificarToken, pedidoController.create);
route.get("/mios", verificarToken, pedidoController.getByUser);

//Usuario y Admin
route.put("/:id", verificarToken, pedidoController.update);
route.delete("/:id", verificarToken, pedidoController.delete);

// Admin
route.get("/", verificarToken, pedidoController.getAll);


export default route;

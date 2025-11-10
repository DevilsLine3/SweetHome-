import Categoria from "../models/categoriaM.js";
import Producto from "../schemas/productosSch.js";

import mongoose from "mongoose";

export const categoriaController = {
    //creacion de categoria
    async create(req, res){
        try {
            if (req.user.Rol !== "Admin") {
                return res.status(403).json({error : "No tienes permisos"});
            }
            const { Nombre, Descripcion } = req.body;
            const existe = await Categoria.findOne({Nombre});
            if (existe) {
                return res.status(400).json({error : "Ya existe una categoria con ese nombre"});
            }
            const nuevaCategoria = new Categoria({ Nombre, Descripcion });
            await nuevaCategoria.save();

            res.json({ msg :"Categoria creada correctamente", Categoria : nuevaCategoria});

        } catch (e) {
            res.status(500).json({ error : e.message});
        }
    },

    async getAll(req,res) {
        try {
            const categorias = await Categoria.find();
            res.json(categorias);
        } catch (e) {
            res.status(500).json({ error : e.message});
        }
    },

    async update(req,res){
        try {
            if (req.user.Rol !== "Admin") {
                return res.status(403).json({ error : "No tienes permisos"});
            }

            const { id } = req.params;
            const { Nombre, Descripcion } = req.body;

            const categoria = await Categoria.findByIdAndUpdate(
                id,
                { Nombre, Descripcion },
                { new : true}
            );

            if (!categoria) {
                return res.status(404).json({ error : "Categoria no encontrada"});
            }

            res.json({ msg : "Categoria actualizada correctamente", categoria});
        } catch (e) {
            res.status(500).json({ error : e.message});
        }
    },



async cambiarEstado(req, res) {
    try {
        if (req.user.Rol !== "Admin") {
            return res.status(403).json({ error: "No tienes permisos" });
        }

        const { id } = req.params;
        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({ error: "Categoria no encontrada" });
        }

        // 1. Cambiar el estado de la categoría
        categoria.Activo = !categoria.Activo;
        await categoria.save();

        // 2. Determinar el nuevo estado de visibilidad para los productos
        const nuevoEstadoVisibilidad = categoria.Activo; // true si se activa, false si se desactiva

        try {
            // 3. Actualizar la visibilidad de todos los productos de esta categoría
            const resultado = await Producto.updateMany(
                { Categoria: id },
                { Visible: nuevoEstadoVisibilidad } // Usa el estado Activo/Inactivo de la categoría
            );
            
            console.log(`Productos actualizados: ${resultado.modifiedCount}`);

        } catch (err) {
            console.error("Error actualizando productos:", err.message);
        }

        res.json({
            msg: `Categoria ${categoria.Activo ? "Activada" : "Desactivada"} correctamente`,
            categoria,
        });

    } catch (e) {
        console.error("Error en cambiarEstado:", e);
        res.status(500).json({ error: e.message });
    }
}
}
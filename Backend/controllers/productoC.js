import productoModel from "../models/productosM.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

class productoController {
// Público: obtener todos los productos
async getAll(req, res) {
    try {
        const productos = await productoModel.getAll();
        const productosFiltrados = productos.filter(p => p.Visible);

        res.status(200).json(productosFiltrados);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}



// Público: obtener un producto por ID
async getOne(req, res) {
    try {
        const producto = await productoModel.getOneById(req.params.id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
            res.json(producto);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

//Usuario: crear producto (solo logueado)
async create(req, res) {
    try {
    const { Nombre, Descripcion, Precio, Categoria, Stock, Imagen } = req.body;

    // Verificar si la categoría existe y está activa
    const categoriaExistente = await mongoose.model('Categorias').findOne({ 
        _id: Categoria,
        Activo: true 
    });

    if (!categoriaExistente) {
        return res.status(400).json({ 
            error: "La categoría especificada no existe o no está activa" 
        });
    }

    // Subir imagen a Cloudinary
    const resultado = await cloudinary.uploader.upload(Imagen, {
        folder: "productos",
    });

    const nuevo = await productoModel.create({
        Nombre,
        Descripcion,
        Precio,
        Categoria: categoriaExistente._id, // Guardamos el ID de la categoría
        Stock,
        Imagen: resultado.secure_url,
        UsuarioCreador: req.user.id,
    });

    res.status(201).json({ msg: "Producto creado", producto: nuevo });
    } catch (e) {
    res.status(500).json({ error: e.message });
    }
}

// Usuario/Admin: editar producto
async update(req, res) {
    try {
    const { id } = req.params;
    const producto = await productoModel.getOneById(id);

    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    // Solo Admin o creador puede editar
    if (req.user.Rol !== "Admin" && producto.UsuarioCreador.toString() !== req.user.id) {
        return res.status(403).json({ error: "No tienes permiso para editar este producto" });
    }

    // Si se está actualizando la categoría, verificar que exista
    if (req.body.Categoria) {
        const categoriaExistente = await mongoose.model('Categorias').findOne({ 
            _id: req.body.Categoria,
            Activo: true 
        });

        if (!categoriaExistente) {
            return res.status(400).json({ 
                error: "La categoría especificada no existe o no está activa" 
            });
        }
    }

    const actualizado = await productoModel.update(id, req.body);
    res.json({ msg: "Producto actualizado", producto: actualizado });
    } catch (e) {
    res.status(500).json({ error: e.message });
    }
}

//Usuario/Admin: eliminar producto
async delete(req, res) {
    try {
    const { id } = req.params;
    const producto = await productoModel.getOneById(id);

    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    // Solo Admin o creador puede borrar
    if (req.user.Rol !== "Admin" && producto.UsuarioCreador.toString() !== req.user.id) {
        return res.status(403).json({ error: "No tienes permiso para eliminar este producto" });
    }

    await productoModel.delete(id);
        res.json({ msg: "Producto eliminado correctamente" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// Usuario: ver solo sus productos
async getByUsuario(req, res) {
    try {
    const productos = await productoModel.getByUsuario(req.user.id);
    res.status(200).json(productos);
    } catch (e) {
    res.status(500).json({ error: e.message });
    
    }
}
}

export default new productoController();

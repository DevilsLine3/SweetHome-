import Producto from "../schemas/productosSch.js";

class productoModel {
    async create(producto) {
        return await Producto.create(producto);
    }

    async getAll() {
        return await Producto.find()
            .populate("Categoria", "Nombre -_id")
            .populate("UsuarioCreador", "Nombre Email -_id"); 
    }

    async getOneById(id) {
        return await Producto.findById(id)
            .populate("Categoria", "Nombre -_id");
    }

    async getByUsuario(idUsuario) {
        return await Producto.find({ UsuarioCreador: idUsuario })
            .populate("Categoria", "Nombre -_id"); 
    }

    async update(id, data) {
        return await Producto.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Producto.findByIdAndDelete(id);
    }
}

export default new productoModel();

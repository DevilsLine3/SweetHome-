import Pedido from "../schemas/pedidosSch.js";

class pedidoModel {
    async create(pedido) {
        return await Pedido.create(pedido);
    }

    async getAll() {
        return await Pedido.find()
        .populate("Usuario", "Email -_id")
        .populate("Productos.Producto", "Nombre Precio -_id");
    }

    async getOne(id) {
        return await Pedido.findById(id)
        .populate("Usuario", "Email -_id")
        .populate("Productos.Producto", "Nombre Precio -_id");
    }

    async getByUser(idUsuario) {
        return await Pedido.find({ Usuario: idUsuario })
        .populate("Productos.Producto", "Nombre Precio -_id");
    }

    async update(id, data) {
        return await Pedido.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Pedido.findByIdAndDelete(id);
    }
}

export default new pedidoModel();

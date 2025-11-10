import mongoose from 'mongoose';
import Usuario from '../schemas/usuariosSch.js'

class usuarioModelo {
    async create(usuario){
        return await Usuario.create(usuario);
    }

    async getAll(){
        return await Usuario.find();
    }

    async getOneById(id){
        return await Usuario.findById(id);
    }

    async getOne(filtro){
        return await Usuario.findOne(filtro);
    }

    async update(id, usuario){
        return await Usuario.findOneAndUpdate({_id : new mongoose.Types.ObjectId(id)}, usuario, {new : true});
    }
    async delete(id){
        return await Usuario.findOneAndDelete(id);
    }


}

export default new usuarioModelo();
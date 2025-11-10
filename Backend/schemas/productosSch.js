import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
        Nombre : {
            type : String,
            required : true,
            trim : true
        },
        Descripcion : {
            type :String,
            required : true
        },
        Precio : {
            type : Number,
            required : true
        },
        Imagen : {
            type : String,
            required : true
        },
        Categoria : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Categorias",
            required : true
        },
        Stock : {
            type : Number,
            default : 0
        },
        Estado : {
            type : String,
            enum : ["Disponible", "Agotado"],
            default: "Disponible"
        },
        FechaCreacion : {
            type : Date,
            default : Date.now
        },
        UsuarioCreador : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "usuarios"
        },
        Visible :{
            type : Boolean,
            default : true
        }
});

export default mongoose.model("productos", productoSchema);
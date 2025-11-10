import mongoose from "mongoose";

const CategoriaSchema =  new mongoose.Schema({
    Nombre : {
        type : String,
        required :true,
        unique : true,
        trim : true
    },
    Descripcion : {
        type : String,
        default : ""
    },
    Activo : {
        type : Boolean,
        default : true
    },
    FechaCreacion : {
        type : Date,
        default : Date.now
    }

});

export default mongoose.model("Categorias", CategoriaSchema);
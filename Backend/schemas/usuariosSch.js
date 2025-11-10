import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        Nombre: {
            type : String,
            required : true
        },
        Apellidos: {
            type : String,
            required : true
        },
        Email: {
            type : String,
            required : true,
            unique : true, 
            lowercase : true,
            trim : true
        },
        Contraseña: {
            type : String,
            required : true,
            minlength : 8
        },
        Rol: {
            type : String,
            enum : ["Admin", "Cliente"],
            default : 'Cliente'
        },
        Telefono: {
            type : String,
            default : null
        },
        Foto : {
            type : String,
            default : null
        },
        Descripcion : {
            type : String,
            default : null
        }
    },{
        timestamps : true
    }
);

export default mongoose.model('usuarios', usuarioSchema);
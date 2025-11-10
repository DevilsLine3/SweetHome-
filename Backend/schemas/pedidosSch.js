import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    Usuario : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "usuarios",
        required : true
    },
    Productos : [
        {
            Producto : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "productos",
                required : true
            },
            Cantidad : {
                type : Number,
                required : true,
                min : 1
            }
        }
    ],
    Total : {
        type : Number,
        required :true
    },
    DireccionEntrega : {
        type : String,
        required : true
    },
    Estado : {
        type :String,
        enum : [ "Pendiente", "Enviado", "Entregado", "Cancelado" ],
        default : "Pendiente"
    },
    Activo : {
        type : Boolean,
        default : true
    },
    MetodoPago : {
        type : String,
        enum :["Contraentrega","Tarjeta"],
        default : "Contraentrega",
        required : true
    }
});

export default mongoose.model("Pedido", pedidoSchema);
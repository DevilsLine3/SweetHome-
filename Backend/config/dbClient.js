import 'dotenv/config';
import mongoose from 'mongoose';

class dbClient {
    constructor(){
        this.connectarBaseDatos();
    }

    async connectarBaseDatos() {
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/SweetHomedb?retryWrites=true&w=majority`;
        await mongoose.connect(queryString);
        console.log("Conexion a la base de datos")
    }

    async cerrarConexion(){
        try {
            await mongoose.disconnect();
            console.log("Conexion a la base de datos cerrada");
        } catch (e) {
            console.log("Error al cerrar la conexion", e);
        }
    }
}

export default new dbClient();
import 'dotenv/config';
import express from 'express';  
import cors from 'cors';
import bodyParser from 'body-parser';
import session from "express-session";
import passport from "./config/googleAuth.js";
import dbClient from './config/dbClient.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import routersUsuario from './routers/usuariosR.js';
import routersCategoria from './routers/categoriasR.js';
import routerspedidos from './routers/pedidosR.js';
import routerProducto from './routers/productosR.js';
import googleAuthRoutes from "./routers/googleR.js";

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Límite para JSON y URL-encoded
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Body parser (opcional si ya usas express.json/urlencoded)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*', // Permite cualquier origen si no se define FRONTEND_URL
    credentials: true,
};
app.use(cors(corsOptions));

// Configuración de sesión
app.use(session({
    secret: process.env.JWT_TOKEN_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Solo cookies seguras en producción
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Servir frontend estático (build de Vite)
const frontendPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendPath));

// Rutas de API
app.use('/api/usuarios', routersUsuario);
app.use('/api/productos', routerProducto);
app.use('/api/categorias', routersCategoria);
app.use('/api/pedidos', routerspedidos);
app.use("/auth", googleAuthRoutes);

app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/auth')) return next();
    res.sendFile(path.join(frontendPath, 'index.html'));
});


// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor en el puerto que asigna Render
app.listen(process.env.PORT, () => console.log(`Servidor activo en el puerto ${process.env.PORT}`));

// Manejo de cierre de DB
process.on('SIGINT', async () => {
    await dbClient.cerrarConexion();
    process.exit(0);
});

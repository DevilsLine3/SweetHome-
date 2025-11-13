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
app.use(express.json({ limit: '50mb' })); 

// Aumenta el límite para datos codificados de URL (si los usas)
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Middlewares básicos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Configuración de sesión y autenticación
app.use(session({
    secret: process.env.JWT_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Servir frontend estático (build de Vite)
const frontendPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendPath));

// Rutas
app.use('/api/usuarios', routersUsuario);
app.use('/api/productos', routerProducto);
app.use('/api/categorias', routersCategoria);
app.use('/api/pedidos', routerspedidos);
app.use("/auth", googleAuthRoutes);

// SPA fallback: servir index.html para rutas que no sean de la API
app.get('*', (req, res, next) => {
    // Si la ruta comienza con /api o /auth, pasar al siguiente handler
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

// Iniciar servidor
try {
    const PORT = process.env.PORT;
    app.listen(PORT, ()=> console.log('Servidor activo en el puerto ' + PORT))
} catch (e) {
    console.log(e)
}

process.on('SIGINT', async() =>{
    dbClient.cerrarConexion();
    process.exit(0);
});
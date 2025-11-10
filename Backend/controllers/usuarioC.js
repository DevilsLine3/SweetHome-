import usuarioModel from '../models/usuariosM.js';
import bcrypt from 'bcryptjs';
import { generarToken } from '../helpers/autentificacion.js';
import cloudinary from '../config/cloudinary.js';


class usuariosController {
    
    // REGISTRO
    async register(req, res) {
        try {
            const { Nombre, Apellidos, Email, Contraseña, Rol, Telefono, Descripcion, Foto } = req.body;

            const usuarioExiste = await usuarioModel.getOne({ Email });
            if (usuarioExiste) {
                return res.status(400).json({ error: 'El usuario ya existe' });
            }

            const claveEncriptada = await bcrypt.hash(Contraseña, 10);

            let imagenUrl = "";
            if (Foto && Foto.startsWith("data:image")) {
                const resultado = await cloudinary.uploader.upload(Foto, { folder: "usuarios" });
                imagenUrl = resultado.secure_url;
            }

            const data = await usuarioModel.create({
                Nombre,
                Apellidos,
                Email,
                Contraseña: claveEncriptada,
                Rol,
                Telefono,
                Descripcion,
                Foto: imagenUrl
            });

            res.status(201).json({ msg: "Usuario registrado correctamente", data });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // LOGIN
    async login(req, res) {
        try {
            const { Email, Contraseña } = req.body;

            const usuarioExiste = await usuarioModel.getOne({ Email });
            if (!usuarioExiste) {
                return res.status(400).json({ error: 'El usuario no existe' });
            }

            const claveValida = await bcrypt.compare(Contraseña, usuarioExiste.Contraseña);
            if (!claveValida) {
                return res.status(400).json({ error: 'Contraseña no válida' });
            }

            const token = generarToken(usuarioExiste);
            return res.status(200).json({ msg: 'Usuario autenticado', token, role: usuarioExiste.Rol });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // ACTUALIZAR PERFIL
    async update(req, res) {
    try {
        const { id } = req.params;

        // Verificar permisos: el usuario solo puede editar su perfil o ser Admin
        if (req.user.id !== id && req.user.Rol !== 'Admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }

        const { Nombre, Apellidos, Telefono, Descripcion, Foto, Rol, Contraseña } = req.body;
        let imagenUrl = Foto;

        // Subir nueva foto si viene en base64
        if (Foto && Foto.startsWith("data:image")) {
            const resultado = await cloudinary.uploader.upload(Foto, { folder: "usuarios" });
            imagenUrl = resultado.secure_url;
        }

        // Preparar datos a actualizar
        const updateData = {
            Nombre,
            Apellidos,
            Telefono,
            Descripcion,
            Foto: imagenUrl
        
        };        

        if (req.user.Rol === 'Admin' && Rol) {
            updateData.Rol = Rol;
        }
        // Actualizar contraseña si se envía
        if (Contraseña) {
            const bcrypt = await import('bcryptjs'); // si estás usando ESM
            updateData.Contraseña = await bcrypt.hash(Contraseña, 10);
        }

        // Actualizar usuario en la base de datos
        const data = await usuarioModel.update(id, updateData);

        res.status(200).json({ msg: "Usuario actualizado correctamente", data });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}


    // ELIMINAR USUARIO
    async delete(req, res) {
        try {
            const { id } = req.params;

            if (req.user.id !== id && req.user.Rol !== 'Admin') {
                return res.status(403).json({ error: 'Acceso denegado' });
            }

            const data = await usuarioModel.delete(id);
            if (!data) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.status(200).json({ msg: "Usuario eliminado correctamente", data });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // OBTENER TODOS LOS USUARIOS (solo admin)
    async getAll(req, res) {
        try {
            if (req.user.Rol !== 'Admin') {
                return res.status(403).json({ error: 'Acceso denegado' });
            }
            const data = await usuarioModel.getAll();
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    //OBTENER UN USUARIO
    async getOne(req, res) {
        try {
            const { id } = req.params;

            if (req.user.id !== id && req.user.Rol !== 'Admin') {
                return res.status(403).json({ error: 'Acceso denegado' });
            }

            const data = await usuarioModel.getOneById(id); // 🔧 corregido: antes usaba getOne
            if (!data) return res.status(404).json({ error: "Usuario no encontrado" });

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    //ABRIR WHATS CON EL NUMERO GUARDADO EN LA BD
    async getWhatsAppLink(req, res) {
        try {
            const { id } = req.params;

            const usuario = await usuarioModel.getOne(id);
            if (!usuario) {
                return res.status(404).json({ error : "Usuario no encontrado"});
            }

            if(!usuario.Telefono){
                return res.status(404).json({ error : "El usuario no tiene un numero registrado"});
            }
            // Normalizar teléfono: dejar solo dígitos
            const numeroSoloDigitos = usuario.Telefono.toString().replace(/\D/g, '');
            if (!numeroSoloDigitos) {
                return res.status(400).json({ error: "Numero invalido" });
            }

            // Prefijo de país (Colombia = 57). Evitar duplicarlo si ya está presente
            const prefijo = '57';
            const telefonoParaWa = numeroSoloDigitos.startsWith(prefijo)
                ? numeroSoloDigitos
                : prefijo + numeroSoloDigitos;

            const mensaje = encodeURIComponent("¡Hola! Me gustaría ponerme en contacto contigo");
            const enlace = `https://wa.me/${telefonoParaWa}?text=${mensaje}`;

            // Devolver enlace en JSON para que el frontend (un botón) lo abra con window.open(enlace)
            res.status(200).json({ enlace });
        } catch (e) {
            res.status(500).send(e);
        }

    }
}

export default new usuariosController();

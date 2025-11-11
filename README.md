# 🏡 Sweet Home - Sistema de Venta de Garage  

<p align="center"> <i><strong> Artículos para el Hogar.</strong></i></p>
<p >  Plataforma digital donde los usuarios pueden vender sus productos y, al mismo tiempo, comprar los de otros. Es decir, funciona como un “mercado virtual” en el que se encuentran múltiples vendedores y compradores. </p>

# Proyecto
Para iniciar debes clonar el repositorio:
```bash

git clone [https://github.com/usuario/sweethome-frontend.git](https://github.com/DevilsLine3/SweetHome-.git)
cd SweetHome-

```
# Frontend

| Tecnología | Uso |
|------------|-----|
| React | Framework principal del frontend |
| TailwindCSS | Estilos rápidos y responsivos |
| Axios | Consumo de la API del backend |
| Vite | Servidor de desarrollo y build rápido |


Antes de iniciar el Frontend debes tener instalado:

- Node.js
- npm

Verifica con:

```bash
node -v
npm -v

```

Luego pasate a la carpeta del frontend:

```bash
cd Frontend

```
Instala dependecias:
```bash
npm install
```

Ejecuta:
``` bash
npm run dev
```


# Backend


## Descripción
Proyecto backend en Node.js con Express y MongoDB (Mongoose) que expone endpoints para usuarios, productos, categorías y pedidos. Incluye autenticación (token en helpers y Google OAuth con Passport) y subida de imágenes a Cloudinary.

## Tecnologías
- Node.js (ES Modules)
- Express
- MongoDB / Mongoose
- Cloudinary (subida de imágenes)
- Passport (Google OAuth)
- bcryptjs, jsonwebtoken

## Requisitos previos
- Node.js >= 18
- Una cuenta MongoDB Atlas (o MongoDB accesible)
- Cuenta Cloudinary para subir imágenes
- (Opcional) Credenciales de Google OAuth para login con Google

## Instalación
Ingresar a la carpeta:
```powershell
cd "c:\Users\justi\OneDrive\Escritorio\SweetHome-\Backend"
```

2. Instalar dependencias:

```powershell
npm install
```

3. Crear un archivo `.env` en la raíz con las variables de entorno (ver sección siguiente).

4. Iniciar el servidor:

```powershell
node app.js
# o (recomendado durante desarrollo)
npx nodemon app.js
```

## Variables de entorno
El proyecto usa las siguientes variables (nombradas tal como aparecen en `config` y `app.js`):

- USER_DB: usuario de la BD (MongoDB Atlas)
- PASS_DB: contraseña del usuario de la BD
- SERVER_DB: host/cluster de MongoDB (ej: cluster0.mongodb.net)
- JWT_TOKEN_SECRET: secreto para sesiones/firmas
- FRONTEND_URL: URL del frontend (ej: http://localhost:5173)
- NODE_ENV: development | production

Cloudinary:
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

Google OAuth (si se usa Google login):
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK_URL

## Estructura principal
- `app.js` - configuración principal de Express y rutas
- `controllers/` - lógica por entidad (usuarios, productos, pedidos, categorías)
- `models/` - modelos Mongoose / capa de acceso a datos
- `routers/` - definición de endpoints
- `schemas/` - esquemas Mongoose (definición de datos)
- `config/` - configuración de Cloudinary, DB, Google Auth
- `helpers/` - utilidades (autenticación, verificación de token)

## Endpoints (resumen)
Rutas principales (prefijo `/api` según `app.js`):

Usuarios (`/api/usuarios`)
- POST /register — registrar usuario (público)
- POST /login — login (público)
- GET / — obtener todos (Privado: Admin)
- GET /:id — obtener usuario (Privado: Admin o dueño)
- PUT /:id — actualizar usuario (Privado: Admin o dueño)
- DELETE /:id — eliminar usuario (Privado: Admin o dueño)
- GET /:id/whatsapp — obtener enlace WhatsApp (Privado)

Productos (`/api/productos`)
- GET / — listar productos visibles (público)
- GET /:id — obtener producto por id (público)
- POST / — crear producto (Privado: usuario autenticado)
- PUT /:id — actualizar producto (Privado: creador o Admin)
- DELETE /:id — eliminar producto (Privado: creador o Admin)
- GET /mis/misproductos — obtener productos de usuario (Privado)

Categorías (`/api/categorias`)
- GET / — listar categorías (público)
- POST / — crear categoría (Privado: Admin)
- PUT /:id — actualizar (Privado: Admin)
- PATCH /:id/estado — activar/desactivar (Privado: Admin)

Pedidos (`/api/pedidos`)
- POST / — crear pedido (Privado: usuario autenticado)
- GET /mios — pedidos del usuario (Privado)
- PUT /:id — actualizar pedido (Privado: Admin o dueño)
- DELETE /:id — eliminar pedido (Privado: Admin o dueño)
- GET / — obtener todos (Privado: Admin)

Auth Google (`/auth`)
- Rutas de OAuth definidas en `routers/googleR.js` (si están implementadas)

## Observaciones y recomendaciones sobre los controladores
Durante la revisión rápida del código se detectaron las siguientes observaciones (recomiendo corregirlas):

1. Orden de rutas con parámetros dinámicos
   - En `routers/productosR.js` la ruta `route.get('/:id')` está antes de `route.get('/mis/misproductos')`. Esto hace que `/mis/misproductos` se capture como `:id='mis'` y no se ejecute la ruta esperada. Solución: mover las rutas más específicas (como `/mis/misproductos`) antes de las rutas con `/:id`.

2. Inconsistencias en `categoriaC.js`
   - Al desactivar una categoría se actualizan productos con `{ categoriaId: id }` y `{ visible: false }`, pero en `productosSch.js` los campos son `Categoria` y `Visible` (mayúsculas). Usar los mismos nombres que el esquema: `{ Categoria: id }` y `{ Visible: false }`.

3. Bug en `usuariosC.getWhatsAppLink`
   - Hay un `res.status(200),json({ enlace});` que parece una coma accidental; debe ser `res.status(200).json({ enlace });`.

4. Validaciones y sanitización
   - Los controladores confían en que el cliente envía campos válidos (ej. `Precio`, `Stock`, `Imagen`). Recomiendo validar tipos y campos requeridos antes de llamar al modelo (puedes usar Joi, express-validator o middleware de validación).

5. Manejo de imágenes
   - `productoC.create` sube `Imagen` a Cloudinary. Si a veces el cliente envía una URL en vez de base64, documentarlo o manejar ambos casos.

6. Consistencia en métodos del modelo
   - Los controladores usan métodos como `getOneById`, `getOne`, `create`, `update`, `delete`. Verifica en `models/` que esos métodos existan y devuelvan lo esperado (y lanzar errores claros si no).

7. Permisos y seguridad
   - Se usa `req.user.Rol` y `req.user.id` — asegúrate de que el middleware `verificarToken` siempre inyecta `req.user` correctamente y maneja tokens expirados.

## Buenas prácticas sugeridas (próximos pasos)
- Añadir validaciones (express-validator o Joi).
- Añadir tests unitarios básicos para controladores/modelos.
- Corregir los bugs identificados en `categoriaC.js` y `usuariosC.getWhatsAppLink`.
- Reordenar rutas para evitar capturas por `/:id` antes de rutas específicas.
- Añadir script `start` y `dev` a `package.json` (ej. `node app.js` y `nodemon app.js`).

## Cómo probar rápidamente
- Levanta el servidor con `node app.js` o `npx nodemon app.js`.
- Usa Postman o Insomnia para probar los endpoints. Asegúrate de incluir el header `Authorization: Bearer <token>` para rutas privadas (si tu `verificarToken` lo requiere).

## Licencia
Proyecto privado (añadir licencia si procede).

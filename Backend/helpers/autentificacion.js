import jsonWebToken from 'jsonwebtoken';
import 'dotenv/config';

export function generarToken(usuario){
    return jsonWebToken.sign(
        {
            id : usuario._id,
            Email : usuario.Email,
            Rol : usuario.Rol
        },
        process.env.JWT_TOKEN_SECRET,
        {expiresIn : '1h'}
    )};

export function verificarToken(req, res, next){

    const token = req.header('Authorization')?.replace('Bearer','').trim();
    if (!token) {
        return res.status(401).json({error : 'Token requerido'})
    }

    try {
        const datatoken = jsonWebToken.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = datatoken;
        next();
    } catch (e) {
        res.status(401).json({error : 'Token no valido'});
    }
    

}
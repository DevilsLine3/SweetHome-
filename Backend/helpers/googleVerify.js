import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

export const googleVerify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return {
        Nombre: payload.name,
        Correo: payload.email,
        Imagen: payload.picture,
        Verificado: payload.email_verified,
    };
};

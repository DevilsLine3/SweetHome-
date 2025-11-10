import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
        try {
            // Aquí podrías buscar o crear el usuario en tu base de datos
            const usuario = {
            Nombre: profile.displayName,
            Email: profile.emails[0].value,
            Foto: profile.photos[0].value,
            GoogleId: profile.id,
            };
            done(null, usuario);
        } catch (e) {
            done(e, null);
        }
        }
    )
);

// Serialización básica
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;

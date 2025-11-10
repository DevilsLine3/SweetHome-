import express from "express";
import passport from "../config/googleAuth.js";

const router = express.Router();

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/fail" }),
    (req, res) => {
        // En este punto Google ya validó la cuenta
        res.json({
        msg: "Inicio de sesión con Google exitoso ",
        user: req.user,
        });
    }
);

router.get("/auth/fail", (req, res) => {
    res.status(401).json({ error: "Error al iniciar sesión con Google" });
});

export default router;

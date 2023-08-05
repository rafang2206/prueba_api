import { Router } from "express";
import { iniciarSesion, 
        registrar, 
        comprobarToken } from "../controllers/authControllers.js";

const router = Router();

router.post("/login", iniciarSesion)

router.post("/register", registrar)

router.get("/comprobar-token/:id", comprobarToken)

export default router;
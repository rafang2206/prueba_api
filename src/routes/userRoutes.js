import { Router } from "express";
import { perfil, 
        editarInformacion } from "../controllers/userController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from "../middlewares/upload.js";

const router = Router();

router.route("/profile")
    .get(authMiddleware, perfil)
    .put(authMiddleware, upload.single('imagenProfile'), editarInformacion)

export default router;
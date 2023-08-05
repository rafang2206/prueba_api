import User from "../models/User.js";
import { validarEditUser } from '../schemas/validationUser.js';

const perfil = async(req, res) => {
    try {
        res.status(200).json({ profile: req.usuario })
    } catch (error) {
        res.status(400).json({ error: "hubo un error" });
    }
}

const editarInformacion = async(req, res) => {

    const result = validarEditUser(req.body);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const { direccion } = req.body;
    const { id } = req.usuario;

    let user = await User.findByPk(id);

    if(!user){
        return res.status(400).json({ error: "el usuario no existe" });
    }

    let imgPerfil = req.imagenProfile ?? user.imgPerfil;

    try {
        await User.update({ direccion, imgPerfil }, { where: { id } })
        res.status(200).json({ msg: "información editada con éxito" });
    } catch (error) {
        res.status(400).json({ error: "hubo un error al editar"})
    }
}

export {
    perfil,
    editarInformacion
}
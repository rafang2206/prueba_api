import User from '../models/User.js';
import Confirmacion from '../models/Confirmacion.js';
import { comprobarPassword, generarId } from '../utils/comprobaciones.js';
import generarJWT from '../utils/generarJWT.js';
import hashearPass from '../utils/passwordHash.js';
import { validarLogin, validarRegistro, validarToken } from '../schemas/validationAuth.js';
import enviarEmail from '../utils/sendMail.js';

const iniciarSesion = async(req, res) => {

    const result = validarLogin(req.body);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if(!user){
        return res.status(400).json({ error: "usuario no encontrado "})
    }
    
    if(user.confirmado === false){
        return res.status(400).json({ error: "usuario no ha sido confirmado "})
    }

    const validarPass = await comprobarPassword(password, user.password)

    if(validarPass){
        let token = await generarJWT(user.id);
        return res.status(200).json({ token });
    }else{
        const error = new Error('Password incorrecto');
        return res.status(403).json({ msg: 'Password incorrecto' });
    }
}

const registrar = async(req, res) => {

    const result = validarRegistro(req.body);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const { email, password, nombre } = req.body;

    const verificarUser = await User.findOne({ where : { email } });

    if(verificarUser){
        return res.status(400).json({ msg: "el correo ya se encuentra registrado" });
    }
    
    let hashPass = await hashearPass(password);
    let fecha = new Date();
    let token = generarId();
    try {
        let user = await User.create({ email, password: hashPass, nombre, imgPerfil: "default.jpg", confirmado: false, tipo: 2 });
        await Confirmacion.create({ userId: user.id, token, fecha, estado: 2 });
        await enviarEmail(email, nombre, token);
        return res.status(202).json({ msg: "usuario creado con éxito" });
    } catch (error) {
        return res.status(400).json({ error: "hubo un error al registrar"});
    }
}

const comprobarToken = async(req, res) => {
    const { id } = req.params;

    const result = validarToken(req.params);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const token = await Confirmacion.findOne({ where: { token: id, estado: 2 } });

    if(!token){
        return res.status(400).json({ error: "token invalido" });
    }
    
    try {
        await User.update({ confirmado: true }, { where: { id: token.userId } })
        await Confirmacion.update({ estado: 1 }, { where: { id: token.id } });
        return res.status(200).json({ msg: "cuenta validad con éxito" });
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

export {
    iniciarSesion,
    registrar,
    comprobarToken
}
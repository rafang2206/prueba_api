import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
           token = req.headers.authorization.split(" ")[1];

           const decoded = jwt.verify(token, process.env.JWT_SECRET);

           req.usuario = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password', 'confirmado'] },
            });

           return next();
           
        } catch (error) {
            const e = new Error('token no valido');
            return res.status(403).json({ msg: e.message })
        }
    }
    if(!token){
        const e = new Error('token no valido o inexistente');
        res.status(403).json({ msg: e.message })
    }

    next();
}

export default checkAuth;
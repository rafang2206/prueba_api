import Sequelize from "sequelize";
import db from '../config/db.js';

const User = db.define('user', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
    imgPerfil: {
        type: Sequelize.STRING,
        default: 'default.jpg'
    },
    confirmado: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    tipo: {
        type: Sequelize.INTEGER
    }
})

export default User;
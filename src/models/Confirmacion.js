import Sequelize from "sequelize";
import db from '../config/db.js';

const Confirmacion = db.define('confirmacione', {
    userId: {
        type: Sequelize.INTEGER
    },
    token: {
        type: Sequelize.STRING
    },
    fecha: {
        type: Sequelize.DATE
    },
    estado: {
        type: Sequelize.INTEGER
    }
})

export default Confirmacion;
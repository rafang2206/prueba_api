import Sequelize from "sequelize";
import db from '../config/db.js';

const Operacion = db.define('operacione', {
    usuarioId: {
        type: Sequelize.INTEGER
    },
    productoId: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.DATE
    },
    cantidad: {
        type: Sequelize.INTEGER
    },
    distribuidor: {
        type: Sequelize.STRING
    }
});

export default Operacion;
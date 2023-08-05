import Sequelize from "sequelize";
import db from '../config/db.js';

const Producto = db.define('producto', {
    nombre: {
        type: Sequelize.STRING
    },
    precio: {
        type: Sequelize.FLOAT
    },
    codigo: {
        type: Sequelize.STRING
    },
    cantidad: {
        type: Sequelize.INTEGER
    },
    categoria: {
        type: Sequelize.INTEGER
    },
    autor: {
        type: Sequelize.STRING
    },
    distribuidor: {
        type: Sequelize.STRING
    }
})

export default Producto;
import Sequelize from "sequelize";
import db from '../config/db.js';

const Carrito = db.define('carritoproducto', {
    usuarioId: {
        type: Sequelize.INTEGER
    },
    productoId: {
        type: Sequelize.INTEGER
    }
});

export default Carrito;
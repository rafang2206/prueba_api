import Sequelize from "sequelize";
import db from '../config/db.js';

const Categoria = db.define('categorias', {
    categoria: {
        type: Sequelize.STRING
    }
})

export default Categoria;
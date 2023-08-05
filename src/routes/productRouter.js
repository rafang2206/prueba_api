import { Router } from "express";
import { obtenerProductos,
        agregarProducto,
        actualizarProducto,
        comprarProducto,
        agregarCarrito,
        obtenerCategorias,
        agregarCategoria,
        obtenerCategoria,
        editarCategoria } from '../controllers/productsController.js';
import autMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get("/", autMiddleware, obtenerProductos);
router.post("/agregar-producto", autMiddleware, agregarProducto);
router.put("/actualizar-producto/:id", autMiddleware, actualizarProducto);
router.post('/agregar-carrito/:id', autMiddleware, agregarCarrito);
router.post("/comprar-producto/:id", autMiddleware, comprarProducto);
router.get("/categorias", autMiddleware, obtenerCategorias);
router.post("/agregar-categoria", autMiddleware, agregarCategoria);
router.route("/categoria/:id")
        .get(autMiddleware, obtenerCategoria)
        .put(autMiddleware, editarCategoria)

export default router;
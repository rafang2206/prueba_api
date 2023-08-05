import Producto from '../models/Producto.js';
import Carrito from '../models/Carrito.js';
import Operacion from '../models/Operacion.js';
import Categoria from '../models/Categoria.js';
import { validarAddProduct,
        validarCantProducto,
        validarCategoria } from '../schemas/validationProducts.js';

const obtenerProductos = async(req, res) => {
    try {
        const productos = await Producto.findAll();
        return res.status(200).json(productos);
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

const agregarProducto = async(req, res) => {

    const result = validarAddProduct(req.body);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const { nombre, 
        precio, 
        codigo, 
        cantidad, 
        categoria,
        autor, 
        distribuidor } = req.body;

    if(req.usuario.tipo !== 1){
        return res.status(400).json({ error: "no tiene permitido realizar esta acción" });
    }
    
    let producto = await Producto.findOne({ where: { codigo }});

    if(producto){
        return res.status(400).json({ error: "el producto ya se encuentra registrado" });
    }

    let verificarCategoria = await Categoria.findByPk(categoria);

    if(!verificarCategoria){
        return res.status(400).json({ error: "la categoria no éxiste" });
    }

    try {
        await Producto.create({ nombre, 
            precio, 
            codigo, 
            cantidad, 
            categoria,
            autor, 
            distribuidor});
        return res.status(200).json({ msg: "producto guardado con éxito" });
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

const actualizarProducto = async(req, res) => {

    const result = validarCantProducto(req.body);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const { cantidad } = req.body;
    const { id } = req.params;

    if(req.usuario.tipo !== 1){
        return res.status(400).json({ error: "no tiene permitido realizar esta acción" });
    }

    if(cantidad < 1){
        return res.status(400).json({ msg: "la cantidad debe ser mayor a 1" });
    }

    let producto = await Producto.findByPk(id);

    if(!producto){
        return res.status(400).json({ error: "el producto no se encuentra registrado" });
    }

    try {
        await Producto.update({ cantidad }, { where: { id }})
        return res.status(200).json({ msg: "producto actualizado con éxito" });
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

const agregarCarrito = async(req, res) => {
    const { id } = req.params;
    
    let carrito = await Carrito.findOne({ where: { usuarioId: req.usuario.id, productoId : id }});

    if(carrito){
        return res.status(404).json({ error: "ya tienes agregado este producto en tu carrito" });
    }
    try {
        await Carrito.create({ usuarioId: req.usuario.id, productoId: id });
        return res.status(200).json({ msg: "producto agregado al carrito con éxito" });
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: "hubo un error" });
    }
}

const comprarProducto = async(req, res) => {

    const result = validarCantProducto(req.body);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const { id } = req.params;
    const { cantidad } = req.body;

    let producto = await Producto.findByPk(id);

    if(!producto){
        return res.status(404).json({ error: "el producto no existe" });
    }

    if(cantidad < 1){
        return res.status(404).json({ error: "debes indicar una cantidad correcta" });
    }

    if(cantidad > producto.cantidad){
        return res.status(404).json({ error: "cantidad de producto no disponible" });
    }

    producto.cantidad -= cantidad; 
    let fecha = new Date();

    try {
        await producto.save();
        await Operacion.create({ usuarioId: req.usuario.id, productoId: id, fecha, cantidad, distribuidor: producto.distribuidor });
        return res.status(200).json({ msg: "producto comprado con éxito" });
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

const obtenerCategorias = async(req, res) => {
    try {
        let categorias = await Categoria.findAll();
        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

const agregarCategoria = async(req, res) => {

    const result = validarCategoria(req.body);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const { categoria } = req.body;

    if(req.usuario.tipo !== 1){
        return res.status(400).json({ error: "no tiene permitido realizar esta acción" });
    }

    let cat = await Categoria.findOne({ where: { categoria: categoria }});

    if(cat){
        return res.status(400).json({ error: "la categoria ya se encuentra" });
    }

    try {
        await Categoria.create({ categoria: categoria });
        return res.status(200).json({ msg: "categoria creada con éxito" })
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

const obtenerCategoria = async(req, res) => {
    const { id } = req.params;

    let categoria = await Categoria.findByPk(id);

    if(!categoria){
        return res.status(404).json({ error: "la categoria no existe" });
    }

    try {
        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

const editarCategoria = async(req, res) => {

    const result = validarCategoria(req.body);

    if(result.error){
        return res.status(400).json({ error: result.error.errors[0].message })
    }

    const { id } = req.params;
    const { categoria } = req.body;

    if(req.usuario.tipo !== 1){
        return res.status(400).json({ error: "no tiene permitido realizar esta acción" });
    }

    let catPreview = await Categoria.findByPk(id);

    if(!catPreview){
        return res.status(404).json({ error: "la categoria no existe" });
    }
    catPreview.categoria = categoria ?? catPreview.categoria;
    try {
        await catPreview.save();
        return res.status(200).json({ msg: "categoria editada con éxito" })
    } catch (error) {
        return res.status(404).json({ error: "hubo un error" });
    }
}

export {
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    comprarProducto,
    agregarCarrito,
    obtenerCategorias,
    agregarCategoria,
    obtenerCategoria,
    editarCategoria
}
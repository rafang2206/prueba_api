import Producto from '../models/Producto.js';
import Carrito from '../models/Carrito.js';
import Operacion from '../models/Operacion.js';
import Categoria from '../models/Categoria.js';
import { obtenerProductos, 
        agregarProducto,
        actualizarProducto,
        agregarCarrito,
        comprarProducto,
        obtenerCategorias,
        agregarCategoria } from '../controllers/productsController.js';

// Tests del area de productos
describe('areaProductos', () => {

    it('retornamos el estado 200 si fue positivo la operacion', async () => {
        const req = {
            body: {
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await obtenerProductos(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    
    // Tests para agregar nuevo producto
    it('agregar producto', async () => {
        const req = {
            body: {
                nombre: 'Product 1',
                precio: 10.5,
                codigo: '123456',
                cantidad: 5,
                categoria: 1,
                autor: 'Author 1',
                distribuidor: 'Distributor 1'
            },
            usuario: {
                tipo: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await agregarProducto(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: 'producto guardado con éxito' });
    });
    
    
    it('agregar producto repetido falla', async () => {
        const req = {
            body: {
                nombre: 'Product 1',
                precio: 10.5,
                codigo: '123456',
                cantidad: 5,
                categoria: 1,
                autor: 'Author 1',
                distribuidor: 'Distributor 1'
            },
            usuario: {
                tipo: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await agregarProducto(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'el producto ya se encuentra registrado' });
    });
    
    
    it('actualizar cantidad de un producto', async () => {
        let productos = await Producto.findAll();
        let id = productos[productos.length - 1].id
        const req = {
            body: {
                cantidad: 20
            },
            params: {
                id: id
            },
            usuario: {
                tipo: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await actualizarProducto(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: 'producto actualizado con éxito' });
    });
    
    
    it('agrega un producto al carrito si este no se encuentra en el carrito', async () => {
        let productos = await Producto.findAll();
        let id = productos[productos.length - 1].id
        const req = {
            params: {
                id: id
            },
            usuario: {
                id: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await agregarCarrito(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: 'producto agregado al carrito con éxito' });
    });
    
    
    it('comprar un producto y descontamos de la cantidad', async () => {
        let productos = await Producto.findAll();
        let id = productos[productos.length - 1].id
        let producto = await Producto.findByPk(id);
        const req = { params: { id: id }, body: { cantidad: 5 }, usuario: { id: 1 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await comprarProducto(req, res);
        let productoPosterior = await Producto.findByPk(id);
        expect(productoPosterior.cantidad).toBeLessThan(producto.cantidad);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: 'producto comprado con éxito' });
    });
    
    
    it('status categorias obtenida', async () => {
        const req = { };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await obtenerCategorias(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    
    it('agregar categoria', async () => {
        const req = {
            body: {
                categoria: 'new category'
            },
            usuario: {
                tipo: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await agregarCategoria(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: 'categoria creada con éxito' });
    });
})

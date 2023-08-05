import User from "../models/User";
import Confirmacion from "../models/Confirmacion";
import { registrar, 
        comprobarToken, 
        iniciarSesion } from "../controllers/authControllers";

// Tests de area de auth
describe('authTest', () => {
    it('registro de usuario', async () => {
        const req = {
            body: {
                email: 'test@test.com',
                password: '123456',
                nombre: 'Test User'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await registrar(req, res);
        const user = await User.findOne({ where: { email: 'test@test.com' } });
        expect(user.email).toBe('test@test.com');
        expect(user.nombre).toBe('Test User');
    });
    
    it('registro de usuario fallido', async () => {
        const req = {
            body: {
                email: 'test12333',
                password: '123456',
                nombre: 'Test User'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await registrar(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
    
    it('validacion de usuario', async() => {
        let user = await User.findOne({ where: { email: 'test@test.com' } });
        let token = await Confirmacion.findOne({ where: { userId: user.id } });
    
        const req = {
            params: {
                id: token.token
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await comprobarToken(req, res);
        let userComprobation = await User.findOne({ where: { email: 'test@test.com' } });
        let tokenComprobation = await Confirmacion.findOne({ where: { token: req.params.id } });
        expect(userComprobation.confirmado).toBe(true);
        expect(tokenComprobation.estado).toBe(1);
    })
    
    it('validacion de usuario fallida', async() => {
        const req = {
            params: {
                id: "123494484848"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await comprobarToken(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })
    
    it("inicio de sesion satisfactorio", async() => {
        const req = {
            body: {
                email: 'test@test.com',
                password: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await iniciarSesion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
    
    it("inicio de sesion fallido", async() => {
        const req = {
            body: {
                email: 'test22@test22.com',
                password: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await iniciarSesion(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })
})

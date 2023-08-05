import { editarInformacion } from "../controllers/userController";
import User from "../models/User";

// test area de usuarios

describe('editarInformacion', () => {

    // Tests editar informacion del usuario correctamente
    it('editar informacion del usuario', async () => {
        const usuarios = await User.findAll();
        let id = usuarios[usuarios.length - 1].id
        const req = {
            body: {
                direccion: 'nueva direccion'
            },
            usuario: {
                id: id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await editarInformacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: 'información editada con éxito' });
    });

    // Tests campo direccion es requerido
    it('campo direccion es requerido', async () => {
        const req = {
            body: {},
            usuario: {
                id: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await editarInformacion(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'la dirección es requerida' });
    });

});

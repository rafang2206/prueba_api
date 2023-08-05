import z from 'zod';

const editUserShema = z.object({
    direccion: z.string({
        invalid_type_error: 'el campo dirección debe ser un string',
        required_error: 'la dirección es requerida'
    })
})

function validarEditUser(objeto){
    return editUserShema.safeParse(objeto);
}

export {
    validarEditUser
}
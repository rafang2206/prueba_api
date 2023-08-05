import z from 'zod';

const loginShema = z.object({
    email: z.string({
        invalid_type_error: 'el campo email debe ser un correo valido',
        required_error: 'el email es requerido'
    }).email(),
    password: z.string({
        invalid_type_error: 'el campo password debe ser un string',
        required_error: 'el password es requerido'
    })
})

const registerShema = z.object({
    email: z.string({
        invalid_type_error: 'el campo email debe ser un correo valido',
        required_error: 'el email es requerido'
    }).email(),
    password: z.string({
        invalid_type_error: 'el campo password debe ser un string',
        required_error: 'el password es requerido'
    }),
    nombre: z.string({
        invalid_type_error: 'el campo nombre debe ser un string',
        required_error: 'el nombre es requerido'
    }),
})

const tokenShema = z.object({
    id: z.string({
        invalid_type_error: 'el campo token debe ser un string',
        required_error: 'el token es requerido'
    }),
})

function validarLogin(objeto){
    return loginShema.safeParse(objeto);
}

function validarRegistro(objeto){
    return registerShema.safeParse(objeto);
}

function validarToken(objeto){
    return tokenShema.safeParse(objeto);
}

export {
    validarLogin,
    validarRegistro,
    validarToken
}
import z from 'zod';

const addProductShema = z.object({
    nombre: z.string({
        invalid_type_error: 'el campo nombre debe ser un string',
        required_error: 'el nombre es requerido'
    }),
    precio: z.number({
        invalid_type_error: 'el campo precio debe ser un número',
        required_error: 'el precio es requerido'
    }),
    codigo: z.string({
        invalid_type_error: 'el campo codigo debe ser un string',
        required_error: 'el codigo es requerido'
    }),
    cantidad: z.number({
        invalid_type_error: 'el campo cantidad debe ser un número',
        required_error: 'la cantidad es requerida'
    }),
    categoria: z.number({
        invalid_type_error: 'el campo categoria debe ser un número',
        required_error: 'la categoria es requerida'
    }),
    distribuidor: z.string({
        invalid_type_error: 'el campo distribuidor debe ser un número',
        required_error: 'el distribuidor es requerido'
    })
})

const cantProductShema = z.object({
    cantidad: z.number({
        invalid_type_error: 'el campo cantidad debe ser un número',
        required_error: 'la cantidad es requerida'
    }),
})

const categoryProductSchema = z.object({
    categoria: z.string({
        invalid_type_error: 'el campo categoria debe ser un string',
        required_error: 'la categoria es requerida'
    })
})

function validarAddProduct(objeto){
    return addProductShema.safeParse(objeto);
}

function validarCantProducto(objeto){
    return cantProductShema.safeParse(objeto);
}

function validarCategoria(objeto){
    return categoryProductSchema.safeParse(objeto);
}



export {
    validarAddProduct,
    validarCantProducto,
    validarCategoria
}
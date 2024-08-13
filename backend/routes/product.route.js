// Importamos express
import express from 'express'

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js'

// Definimos la constante 'router' para usar el manejador de rutas de Express
const router = express.Router()

// Definimos la ruta para obtener todos los productos (ruta -> '/api/products')
// Se importa la funcion 'getProducts' que tiene la logica de obtener todos los productos del archivo 'product.controller.js'
router.get('/', getProducts)


// Definimos la ruta para crear un producto (ruta -> '/api/products')
// Se importa la funcion 'createProduct' que tiene la logica de obtener todos los productos del archivo 'product.controller.js'
router.post('/', createProduct)


// Definimos la ruta para actualizar algun elementos del producto (ruta -> '/api/products/:id')
// Se importa la funcion 'updateProduct' que tiene la logica de obtener todos los productos del archivo 'product.controller.js'
router.put('/:id', updateProduct)


// Definimos la ruta para eliminar un producto de la base de datos (ruta -> '/api/products/:id' )
// Se importa la funcion 'deleteProduct' que tiene la logica de obtener todos los productos del archivo 'product.controller.js'
router.delete('/:id', deleteProduct)




export default router
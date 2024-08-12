// Importamos 'express'
import express from 'express'

// Importamos manejador de variables de entorno 'dotenv'
import dotenv from 'dotenv'
dotenv.config()

// Se importa el archivo 'db.js' que es el que tiene la logica de la conexion con la base de datos
import { connectDB } from './config/db.js'

// Importamos el modelo 'Product' que es el que tiene la estructura de la coleccion 'products' en la base de datos
import Product from './models/product.model.js'

// Se define la constante 'app' para poder usar express en la aplicacion
const app = express()

// Configuramos el middleware para leer los datos del body de las peticiones
app.use(express.json())

// Definimos la ruta para crear un producto (ruta -> '/post')
 app.post('/api/products', async (request, response) => {
  const product = request.body

  // Validamos que el producto tenga nombre, precio y imagen
  if(!product.name || !product.price || !product.image){
    return response.status(400).json({ success: false, message: 'El producto debe de tener nombre, precio e imagen'})
  }

  // Se crea un nuevo producto en la base de datos
  const newProduct = new Product(product)
  try {
    await newProduct.save()
    response.status(201).json({ succes: true, data: newProduct})

  } catch (error) {
    console.log('Error al crear el producto: ', error.message)
    response.status(500).json({ success: false, message: 'Error al crear el producto'})
  }
})

// Configuramos el puerto en el que se va a escuchar la aplicacion
app.listen(5000, () => {
    // Defininimos la constante importada de la conexion de la base de datos 'connectDB del archivo db.js'
    connectDB()
    console.log('Server corriendo en el puerto 5000')
})
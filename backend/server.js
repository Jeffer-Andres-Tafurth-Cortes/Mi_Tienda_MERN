// Importamos 'express'
import express from 'express'

// Importamos manejador de variables de entorno 'dotenv'
import dotenv from 'dotenv'
dotenv.config()

// Se importa el archivo 'db.js' que es el que tiene la logica de la conexion con la base de datos
import { connectDB } from './config/db.js'

import productRoutes from './routes/product.route.js'

// Se define la constante 'app' para poder usar express en la aplicacion
const app = express()

// Configuramos el middleware para leer los datos del body de las peticiones
app.use(express.json())

const PORT = process.env.PORT || 5000

// Definimos para que la aplicacion user las rutas descritas en el archivo 'product.route.js' de la carpeta 'routes'
app.use('/api/products', productRoutes)

// Configuramos el puerto en el que se va a escuchar la aplicacion
app.listen(PORT, () => {
    // Defininimos la constante importada de la conexion de la base de datos 'connectDB del archivo db.js'
    connectDB()
    console.log(`Server corriendo en el puerto http://localhost:${PORT}`)
})
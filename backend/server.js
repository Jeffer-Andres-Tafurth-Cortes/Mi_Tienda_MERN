// Importamos 'express'
import express from 'express'

// Se define la constante 'app' para poder usar express en la aplicacion
const app = express()

// Configuramos el puerto en el que se va a escuchar la aplicacion
app.listen(5000, () => {
    console.log('Server corriendo en el puerto 5000')
})
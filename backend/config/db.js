// Importamos 'mongoose' para poder conectar la base de datos
import mongoose from "mongoose"

// La constante 'connectDB' tiene la conexión a la base de datos MongoDB
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Base de datos conectada ${conn.connection.host}`);
    
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1) // Salimos del proceso con un código de error
  }
}
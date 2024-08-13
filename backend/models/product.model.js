// Importamos 'mongoose'
import mongoose from "mongoose";

// Definimos el modelo para la coleccion de los produtos
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,    // createdAt, updatedAt
  }
);

// Definimos la variable que va a contener el modelo de la coleccion de los productos
const Product = mongoose.model('Product', productSchema)

// Exportamos el modelo
export default Product;

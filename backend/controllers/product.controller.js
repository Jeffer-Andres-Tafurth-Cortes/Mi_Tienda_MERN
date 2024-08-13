// Importamos 'mongoose'
import mongoose from "mongoose"

// Importamos el modelo 'Product' que es el que tiene la estructura de la coleccion 'products' en la base de datos
import Product from "../models/product.model.js"

// El controlador 'getProducts' contienen la logica de sincronicidad para obtener todos los productos
export const getProducts = async (request, response) => {

  try{
    const products = await Product.find({})
    response.status(200).json({ success: true, data: products, message: 'Todos los productos se han obtenido existosamente' })

  } catch (error) {
    console.log('Error al obtener los productos: ', error.message)
    return response.status(500).json({ success: false, message: 'Error al obtener los productos'})
  }
}


// El controlador 'createProduct' contiene la logica de sincronicidad para crear un nuevo producto
export const createProduct = async (request, response) => {
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
    response.status(500).json({ success: false, message: 'Error de servidor'})
  }
}


// El controlador 'updateProduct' contiene la logica de sincronicidad para actualizar un producto
export const updateProduct = async (request, response) => {

  // Se define una constante 'id' para buscar el producto por su id
  const { id } = request.params

  // Se define la constante 'product' en donde el requerimiento es el body(cuerpo/data) del producto
  const product = request.body

  // Con ayuda de mongoose verificamos que el id(ObjectId de MongoDB) sea valido
  if(!mongoose.Types.ObjectId.isValid(id)){
    return response.status(404).json({ success: false, message: 'Id de producto invalido'})
  }

  try {
    // Se busca el producto en la base de datos y se actualiza con los nuevos valores del producto
    const updatedProdut = await Product.findByIdAndUpdate(id, product, {new: true})
    response.status(200).json({ success: true, data: updatedProdut, message: 'El producto se ha actualizado' })

  } catch (error) {
    console.log('Error al buscar el producto: ', error.message)
    return response.status(500).json({ success: false, message: 'Error en el servidor'})
  }
}



// El controlador 'deleteProduct' contiene la logica de sincronicidad para eliminar un producto
export const deleteProduct = async (request, response) => {

  // Se define el parametro 'id' pa buscar y eliminar un producto a traves de us id
  const { id } = request.params

  // Con ayuda de mongoose verificamos que el id(ObjectId de MongoDB) sea valido
  if(!mongoose.Types.ObjectId.isValid(id)){
    return response.status(404).json({ success: false, message: 'Id de producto invalido'})
  }

  try {
    // Se busca el producto en la base de datos y se elimina
    await Product.findByIdAndDelete(id)
    response.status(200).json({success: true, message: 'Producto eliminado correctamente'})

  } catch (error) {
    console.log('Error al buscar el producto: ', error.message)
    return response.status(500).json({ success: false, message: 'Error de servidor'})
  }

}
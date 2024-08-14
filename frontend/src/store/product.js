// Importamos 'zustand' para manejar el estado global de la aplicacion
import {create} from 'zustand'

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {

    // dentro de la funcion 'createProduct' se valida si no se esta pasando el nombre, el precio o la imagen del producto a crear
    if(!newProduct.name || !newProduct.price || !newProduct.image){
      return { success: false, message: 'Por favor completar todos los espacios' }
    }

    const response = await fetch('/api/products',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    set((state) => ({products:[...state.products, data.data]}))
    return { success: true, message: 'Producto creado existosamente' }
  },

  fetchProducts: async () => {
    const response = await fetch('/api/products')
    const data = await response.json()
    set({ products: data.data })
  },

  deleteProduct: async (pid) => {
    const response = await fetch(`/api/products/${pid}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    if(!data.success){
      return {success: false, message: data.message}
    }

    set((state) => ({ products: state.products.filter(product => product._id !== pid) }))
    return { success: true, message: 'Producto eliminado correctamente' }
  },

  updateProduct: async (pid, updatedProduct) => {
    const response = await fetch(`/api/products/${pid}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    })

    const data = await response.json()
    if(!data.success) return {success: false, message: data.message}

    set((state) => ({
      products: state.products.map(product => product._id === pid ? data.data : product)
    }))

    return { success: true, message: 'Producto actualizado correctamente' }
    
  }
}))

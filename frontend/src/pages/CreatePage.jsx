import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

// El componente 'CreatePage' corresponde a la pagina dentro de la aplicacion en la cual se crean los productos
function CreatePage() {

  // Se usa el hook 'useState' para manejar el formulario cuando se crean productos en la aplicacion (tienda online)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  // Se importa 'useToast' de Chakra UI para mostrar una notificacion cuando el producto se ha creado
  const toast = useToast()


  // Se usa el hook 'useProductStore' para interactuar con el store de productos
  const { createProduct } = useProductStore()

  // Este 'handleAddProduct' se va a encargar de agregar el nuevo producto a la base de datos cuando se presione el boton 'Agregar'
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    console.log('Success: ', success);
    console.log('Message:', message );

    if(!success){
      toast({ title: 'Error', description: message, status: 'error', duration: 5000, isClosable: true })

    } else {
      toast({ title: 'Producto creado', description: message, status:'success', duration: 5000, isClosable: true })
    }
    setNewProduct({ name: '', price: '', image: '' }) // Reseteamos el formulario despues de crear el producto
  }

  return (

    // Este 'Container' se va a tratar de el formulario usado para agregar productos en la tienda online
    <Container maxWidth={'container.sm'}>

      {/** El 'VStack' nos dice que el estilo es de manera vertical */}
      <VStack spacing={8}>

        {/** El 'Heading' representa el titlo del formulario */}
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} marginBottom={8}>
          Crear un nuevo producto en la tienda
        </Heading>

        <Box width={'full'} backgroundColor={useColorModeValue('white', 'gray.800')} p={6} rounded={'lg'} shadow={'md'}>

          {/** Dentro de este 'VStack' estara el respectivo formulario para añadir productos a la tienda */}
          <VStack spacing={4}>

            <Input placeholder='Escriba el nombre del producto' name="name" value={newProduct.name} // Input para el nombre del producto
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})} 
            />
            <Input placeholder='Escriba el precio del producto' name="price" value={newProduct.price} // Input para el precio del producto
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})} 
            />
            <Input placeholder='Suba la URL de la imagen del producto' name="image" value={newProduct.image} // Input para la imagen del producto
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})} 
            />

            <Button colorScheme='blue' onClick={handleAddProduct} width='full'>
              Añadir producto a la tienda
            </Button>

          </VStack>


        </Box>

      </VStack>

    </Container>
  )
}

export default CreatePage
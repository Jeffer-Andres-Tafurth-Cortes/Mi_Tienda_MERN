import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useProductStore } from "../store/product"
import { useState } from "react";

// El componente 'ProductCard' sera es esquema visual en la tienda que tendra cada producto creado
function ProductCard({ product }) {

  // Se usa el hook 'useState' para manejar el formulario cuando se edita un producto en la aplicacion (tienda online)
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')

  // Se usa el hook 'useProductStore' para obtener la logica de sincronicidad para editar y eliminar productos
  const { deleteProduct, updateProduct } = useProductStore()

  // Se importa la funcion 'useToast' de Chakra UI para mostrar una notificacion cuando se elimine o cuando se actualice un producto
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // La funcion 'handleUpdateProduct' es la encargada de ejecutarse cuando se edita un producto
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct)
    onClose()

    if(!success){
      toast({ title: 'Error', description: message, status: 'error', duration: 5000, isClosable: true })
    } else {
      toast({ title: 'Producto actualizado', description: message, status:'success', duration: 5000, isClosable: true })
    }
  }

  // La funcion 'handleDeleteProduct' es la encargada de ejecutarse cuando se elimina un producto
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid)
    if(!success){
      toast({ title: 'Error', description: message, status: 'error', duration: 5000, isClosable: true })
    } else {
      toast({ title: 'Producto eliminado', description: message, status:'success', duration: 5000, isClosable: true })
    }
  }

  return (

    // Este 'Box' va a especificar cada caja la cual va a tener y mostras cada producto en la tienda
    <Box shadow={'lg'} rounded={'lg'} overflow={'hidden'} transition={'all 0.3s'} 
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl'}} bg={bg}
    >
      {/* Este 'Image' va a mostrar la imagen del producto */}
      <Image src={product.image} alt={product.name} height={48} width={'full'} objectFit={'cover'} />

      {/* Este 'Box' va a mostrar el nombre y el precio del producto */}
      <Box p={4}>
        <Heading as={'h3'} size={'md'} marginBottom={2}>
          {product.name}
        </Heading>

        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} marginBottom={4}>
          ${product.price}
        </Text>

        {/** Este 'HStack' va a contener las opciones de editar el producto y eliminar el producto */}
        <HStack spacing={2} justify={'end'}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
        </HStack>
      </Box>

      {/** Aqui va la logica del 'Modal' cuando se va a actualizar el nombre, precio o imagen de algun producto */}
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

        <ModalContent>
          <ModalHeader>Actualizar un producto</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>

              <Input placeholder='Nombre del producto' name="name" value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
              />
              <Input placeholder='Precio del producto' name="price" type='number' value={updatedProduct.price} 
                onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
              />
              <Input placeholder='URL de la imagen del producto' name="image" value={updatedProduct.image} 
                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
              />
          
            </VStack>

          </ModalBody>
          <ModalFooter>

            <Button colorScheme='blue' marginRight={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Actualizar producto
            </Button>
            <Button colorScheme='red' onClick={onClose}>
              Cancelar
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>



    </Box>
  )
}

export default ProductCard
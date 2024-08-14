import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from "@chakra-ui/react"

// El componente 'ProductCard' sera es esquema visual en la tienda que tendra cada producto creado
function ProductCard({ product }) {

  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')

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
          <IconButton icon={<EditIcon />} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} colorScheme="red" />
        </HStack>
      </Box>
    </Box>
  )
}

export default ProductCard
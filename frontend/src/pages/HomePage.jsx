import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

/* El componente 'HomePage' corresponde a la pagina como tal del inicio de la aplicacion
  aqui se mostraran todos los productos agregados en la tienda
*/
function HomePage() {

  // Se usa el hook 'useProductStore' para obtener la logica de sincronicidad para obtener todos los productos
  const { fetchProducts, products } = useProductStore()

  useEffect(() => {
    // Cuando se monta este componente, se llamara la funcion 'fetchProducts' para obtener todos los productos
    fetchProducts()  // Esta llamada es asincrona y utiliza el hook 'useEffect' para que se ejecute cada vez que se renderiza el componente HomePage
  }, [fetchProducts]);
  console.log('products', products)
  
  return (

    // Este Container contiene toda la informacion de los productos en la tienda en un solo lugar
    <Container maxWidth={'container.xl'} paddingY={12}>
      <VStack spacing={8}>

        {/** Este primer 'Text' contiene un titulo que indica que estamos en la tienda online */}
        <Text fontSize={'30'} fontWeight={'bold'} bgGradient={'linear(to-r, cyan.400, blue.500)'} bgClip={'text'} 
          textAlign={'center'}
        >
          Productos en la tienda
        </Text>

        

        {/** Este 'SimpleGrid' contendra los productos de la tienda de manera visual */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3}} spacing={10} width={'full'}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          // Este segundo 'Text' se mostrara si no hay ningun producto creado en la tienda
          <Text fontSize='xl' textAlign='center' fontWeight='bold' color='gray.500' >
            No hay productos en la tienda
            <Link to={'/create'}>
              <Text color={'blue.500'} _hover={{ textDecoration:'underline' }}>
                Agregar productos a la tienda
              </Text>
            </Link>
          </Text>
        )}


      </VStack>
    </Container>
  )
}

export default HomePage
import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { PlusSquareIcon } from '@chakra-ui/icons'

import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'

// El componente 'Narbar' es la barra de busqueda de la aplicacion
function Navbar() {

  // Se utiliza el hook 'useColorMode' de Chakra UI para cambiar el theme de la aplicacion
  const { colorMode, toggleColorMode } = useColorMode()

  

  return (

    // Este contenedor va a definir la barra de busqueda
    <Container maxWidth={'1140px'} paddingX={4} >

      <Flex height={16} alignItems={'center'} justifyContent={'space-between'} flexDirection={{ base: 'column', sm: 'row'}}>

        {/** Este Flex va a contener el titulo principal en toda la aplicacion(tienda online)  */}
        <Text fontSize={{ base: '22', md: '28'}} fontWeight={'bold'} textTransform={'uppercase'} textAlign={'center'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'} bgClip={'text'}
        >
          <Link to={'/'}>Productos en tienda 🛒</Link>
        </Text>


        {/** Este HStack contiene dos opciones dentro de la aplicacion */}
        <HStack spacing={2} alignItems={'center'} >

          {/** La primer opcion es dirigirnos a crear un producto para luego mostrarlo en la aplicacion(tienda online) */}
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          {/** La segunda opcion es para cambiar el theme de la aplicacion; es decir, modo claro o modo oscuro */}
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun size='20' />}
          </Button>

        </HStack>

      </Flex>


    </Container>
  )
}

export default Navbar
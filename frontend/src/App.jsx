import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"

// El componente 'App' es el encargado de renderizar todo lo de nuestra aplicacion
function App() {

  return (

    // Este Box va a contener toda la parte visual de como estara formada nuestra aplicacion
    <Box minHeight={'100vh'}>

      {/** Aqui estara la barra de busqueda para nuestra aplicacion */}
      <Navbar />

      {/** Importamos el tema de las rutas para nuestra aplicacion */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>


    </Box>
  )
}

export default App

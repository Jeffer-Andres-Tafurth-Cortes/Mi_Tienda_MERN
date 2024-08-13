import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Importamos Chakra UI
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* Envolvemos nuestra aplicacion con la libreria React Router para el tema de rutas */}
    <BrowserRouter>

      {/** Envolvemos nuestra aplicacion con la libreria Chakra UI */}
      <ChakraProvider>
          <App />
      </ChakraProvider>

    </BrowserRouter>
  </StrictMode>,
)

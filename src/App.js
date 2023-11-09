import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header'
import EventList from './components/EventList'

function App() {
  return (
    <ChakraProvider>
      <Header />
      <EventList />
    </ChakraProvider>
  )
}

export default App

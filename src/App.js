import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header'
import EventList from './components/EventList'
import AddEventForm from './components/AddEventForm'

function App() {
  return (
    <ChakraProvider>
      <Header />
      <AddEventForm />
      <EventList />
    </ChakraProvider>
  )
}

export default App

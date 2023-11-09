import React, {useState, useEffect} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header'
import EventList from './components/EventList'
import AddEventForm from './components/AddEventForm'

function App() {

  //state to store the list of events
  const [events, setEvents] = useState([]);

  //function to handle new event
  const handleAddEvent = (newEvent) => {
    //update the events state with the new event
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  //fetch events from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/events')// use Fetch API to get events from the server
      .then((response) => {
        if (!response.ok) {// check if response is successful
          throw new Error('Network response was not ok');
        }
        return response.json();// parse response as JSON
      })
      .then((data) => setEvents(data))//update the events state with the retrieved data
      .catch((error) => console.error('Error fetching data:', error));// log any errors that occur during fetch
  }, []);//effect runs only once when component mounts

  return (
    <ChakraProvider>
      <Header />
      <AddEventForm onAddEvent={handleAddEvent} />
      <EventList events={events}/>
    </ChakraProvider>
  )
}

export default App

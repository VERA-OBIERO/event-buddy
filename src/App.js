import React, {useState, useEffect} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header'
import EventList from './components/EventList'
import AddEventForm from './components/AddEventForm'
import Search from './components/Search'
import Footer from './components/Footer'

function App() {

  //state to store the list of events
  const [events, setEvents] = useState([]);

  // State to store filtered events
  const [filteredEvents, setFilteredEvents] = useState([]);

  //function to handle new event
  const handleAddEvent = (newEvent) => {
    //update the events state with the new event
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

    // Function to handle search
    const handleSearch = (searchTerm) => {
      // Filter events based on the search term
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.category.toLowerCase().includes(searchTerm.toLowerCase())
        // Add more fields as needed for your search
      );
  
      setFilteredEvents(filtered);
    };

    const handleDeleteEvent = (eventId) => {
      // Perform deletion on the server and update the events state
      fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          // Update the events state by removing the deleted event
          setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        })
        .catch((error) => console.error('Error deleting event:', error));
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
      <Search onSearch={handleSearch} />
      <AddEventForm onAddEvent={handleAddEvent} />
      <EventList events={filteredEvents.length > 0 ? filteredEvents : events} onDeleteEvent={handleDeleteEvent}/>
      <Footer />
    </ChakraProvider>
  )
}

export default App

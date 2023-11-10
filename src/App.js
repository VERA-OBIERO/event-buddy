import React, { useState, useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import EventList from './components/EventList';
import AddEventForm from './components/AddEventForm';
import Search from './components/Search';
import EditEventForm from './components/EditEventForm';
import Footer from './components/Footer';

const theme = extendTheme({
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  colors: {
    primary: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      // Add more shades as needed
    },
    secondary: {
      50: '#ffe6e6',
      100: '#ff9999',
      // Add more shades as needed
    },
  },
});

function App() {
  // state to store the list of events
  const [events, setEvents] = useState([]);

  // State to store filtered events
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null); // Track the currently edited event

  // function to handle new event
  const handleAddEvent = (newEvent) => {
    // update the events state with the new event
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

  // Handle editing events
  const handleEditEvent = (editedEvent) => {
    // Update the events state with the edited event
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === editedEvent.id ? editedEvent : event))
    );
    // Reset the selectedEvent after editing
    setSelectedEvent(null);
  };

  // fetch events from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/events') // use Fetch API to get events from the server
      .then((response) => {
        if (!response.ok) {
          // check if response is successful
          throw new Error('Network response was not ok');
        }
        return response.json(); // parse response as JSON
      })
      .then((data) => setEvents(data)) // update the events state with the retrieved data
      .catch((error) => console.error('Error fetching data:', error)); // log any errors that occur during fetch
  }, []); // effect runs only once when component mounts

  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <Search onSearch={handleSearch} />
                <EventList events={filteredEvents.length > 0 ? filteredEvents : events} onDeleteEvent={handleDeleteEvent} />
              </React.Fragment>
            }
          />
          <Route path="/add-event" element={<AddEventForm onAddEvent={handleAddEvent} />} />
        </Routes>
        {selectedEvent && (
          <EditEventForm event={selectedEvent} onEditEvent={handleEditEvent} onClose={() => setSelectedEvent(null)} setEvents={setEvents} />
        )}
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;


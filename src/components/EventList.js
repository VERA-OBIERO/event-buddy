import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Image, Heading, Text, ButtonGroup, Button } from '@chakra-ui/react'

const EventList = () => {
  // Define state variables for events and loading status
  const [events, setEvents] = useState([]); // Store event data
  const [loading, setLoading] = useState(true); // Help manage loading state

  // Use the useEffect hook to fetch event data when the component mounts
  useEffect(() => {
    // Fetch event data from your JSON server
    fetch('http://localhost:3000/events') 
      .then((response) => {
        // Check if the response is successful 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        setEvents(data); // Update the events state with the retrieved data
        setLoading(false); // Set loading state to false
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log any fetch errors
        setLoading(false); // Set loading state to false
      });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  // Render content based on loading state and event data
  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }
  // return data in form of Cards styled using Chakra UI
  return (
    <div>
    <h2>Event List</h2>
    <SimpleGrid columns={3} spacing={4}>
      {events.map((event) => (
        <Box key={event.id} maxW="sm">
          <Image
            src={event.poster}
            alt={event.title}
            borderRadius="lg"
          />
          <Box p="4">
            <Heading size="md">{event.title}</Heading>
            <Text>{event.description}</Text>
            <Text>Date: {event.date}</Text>
            <Text>Time: {event.time}</Text>
            <Text>Category: {event.category}</Text>
            <Text>Location: {event.location}</Text>
            <ButtonGroup spacing="2" mt="4">
              <Button variant="solid" colorScheme="blue">
                Buy now
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Add to cart
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  </div>
  );
};

export default EventList;


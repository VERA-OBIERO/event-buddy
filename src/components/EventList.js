import React from 'react';
import { SimpleGrid, Box, Image, Heading, Text, ButtonGroup, Button } from '@chakra-ui/react'

  const EventList = ({ events }) => {
  
    //check if there are no events or the events array is empty
    if (!events || events.length === 0) {
      return <div>No events available.</div>;//display a message if there are no events
    }

  //render list of events using Chakra UI in Card format
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


import React from 'react';
import { useState } from 'react';
import { SimpleGrid, Box, Image, Heading, Text, ButtonGroup, Button } from '@chakra-ui/react'
import RSVPModal from './RSVPModal';
import EditEventForm from './EditEventForm';

  
const EventList = ({ events, setEvents, onDeleteEvent }) => {
    const [isRSVPModalOpen, setRSVPModalOpen] = useState(false);

    const openRSVPModal = () => setRSVPModalOpen(true);
    const closeRSVPModal = () => setRSVPModalOpen(false);


    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEditEvent = (editedEvent) => {
      console.log('handleEditEvent called with:', editedEvent);
      // Update the events state with the edited event
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === editedEvent.id ? editedEvent : event))
      );
      // Reset the selectedEvent after editing
      setSelectedEvent(null);
    };
    
  
    const openEditForm = (event) => {
      setEditFormOpen(true);
      setSelectedEvent(event);
    };
  
    const closeEditForm = () => {
      setEditFormOpen(false);
      setSelectedEvent(null);
    };
  
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
              <Button variant="solid" colorScheme="blue" onClick={openRSVPModal}>
                RSVP
              </Button>
              <Button variant="solid" colorScheme="blue" onClick={() => openEditForm(event)}>
                  Edit
              </Button>
              <Button variant="ghost" colorScheme="red" onClick={() => onDeleteEvent(event.id)}>
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
    <RSVPModal isOpen={isRSVPModalOpen} onClose={closeRSVPModal} />
    {isEditFormOpen && selectedEvent && (
    <EditEventForm event={selectedEvent} onEditEvent={handleEditEvent} onClose={closeEditForm} setEvents={setEvents} />
      )}
  </div>
  );
};

export default EventList;


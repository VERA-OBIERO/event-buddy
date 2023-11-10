import React, { useState } from 'react';
import { Box, Input, Button, Textarea, FormControl, FormLabel } from '@chakra-ui/react';

const EditEventForm = ({ event, onEditEvent, onClose,setEvents }) => {
  const [editedEvent, setEditedEvent] = useState({
    poster: event.poster,
    title: event.title,
    date: event.date,
    time: event.time,
    category: event.category,
    location: event.location,
    description: event.description,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleEditEvent = () => {
    console.log('handleEditEvent called');
    // Send a PUT request to update the event on the server
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedEvent),
    })
    .then((response) => response.json())
    .then((data) => {
      // Update the event in the parent component
      onEditEvent(data);
      // Close the edit form
      onClose();
      // Check if setEvents is a function before calling it
      if (typeof setEvents === 'function') {
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === data.id ? data : e))
        );
      } else {
        console.error('setEvents is not a function');
      }
    })
      .catch((error) => {
        console.error('Error editing event:', error);
      });
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Poster URL</FormLabel>
        <Input type="text" name="poster" value={editedEvent.poster} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input type="text" name="title" value={editedEvent.title} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input type="text" name="date" value={editedEvent.date} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Time</FormLabel>
        <Input type="text" name="time" value={editedEvent.time} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Input type="text" name="category" value={editedEvent.category} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input type="text" name="location" value={editedEvent.location} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea name="description" value={editedEvent.description} onChange={handleInputChange} />
      </FormControl>
      <Button onClick={handleEditEvent} colorScheme="blue" mt="4">
        Save Changes
      </Button>
    </Box>
  );
};

export default EditEventForm;

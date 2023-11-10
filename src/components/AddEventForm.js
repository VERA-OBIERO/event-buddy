import React, { useState } from 'react';
import { Box, Input, Button, Textarea, FormControl, FormLabel } from '@chakra-ui/react';

const AddEventForm = ({ onAddEvent }) => {
  //state to manage form input values
  const [newEvent, setNewEvent] = useState({
    poster: '',
    title: '',
    date: '',
    time: '',
    category: '',
    location: '',
    description: '',
  });

  //function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //update the form state with the new input value
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  //function to handle adding a new event
  const handleAddEvent = () => {
    // send a POST request to the server with the new event data
    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => {
        if (!response.ok) {//check if response is successful
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the local state in the AddEventForm component
        onAddEvent(data);
        //reset the form fields after adding the event
        setNewEvent({
          poster: '',
          title: '',
          date: '',
          time: '',
          category: '',
          location: '',
          description: '',
        });
      })
      .catch((error) => {
        console.error('Error adding event:', error);//log errors that occur during fetch
      });
  };
  

  return (
    <Box p="4" maxW="600px" mx="auto" mt="4" bg="primary.100" borderRadius="lg" boxShadow="lg">
      <h2>Add New Event</h2>
      <FormControl>
        <FormLabel>Poster URL</FormLabel>
        <Input type="text" name="poster" value={newEvent.poster} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input type="text" name="title" value={newEvent.title} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input type="text" name="date" value={newEvent.date} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Time</FormLabel>
        <Input type="text" name="time" value={newEvent.time} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Input type="text" name="category" value={newEvent.category} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input type="text" name="location" value={newEvent.location} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea name="description" value={newEvent.description} onChange={handleInputChange} />
      </FormControl>
      <Button onClick={handleAddEvent} colorScheme="teal" mt="4" >
        Add Event
      </Button>
    </Box>
  );
};

export default AddEventForm;

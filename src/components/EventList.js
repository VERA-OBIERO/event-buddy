import React, { useState, useEffect } from 'react';

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

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;


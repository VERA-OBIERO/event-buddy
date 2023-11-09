import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

/// Define a function takes a prop onSearch
const Search = ({ onSearch }) => {
    //state to manage search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  //event handler for changes in the search input field
  const handleInputChange = (e) => {
    //update search term state with current input value
    setSearchTerm(e.target.value);
  };

  //event handler for the search button click
  const handleSearch = () => {
    // Pass the search term to the parent component
    onSearch(searchTerm);

    // Clear the search input after performing the search
    setSearchTerm('');
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearch} colorScheme="blue" mt="2">
        Search
      </Button>
    </div>
  );
};

export default Search;

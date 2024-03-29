import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Heading, Spacer, Box, Link as ChakraLink } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="teal" p="4" color="white">
      <Flex>
        <Box>
          <Heading size="2xl" fontWeight="bold">
            Welcome to Event Buddy!
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <ChakraLink as={Link} to="/" color="white" marginRight="4">
            Home
          </ChakraLink>
          <ChakraLink as={Link} to="/add-event" color="white" marginRight="4">
            Add Event
          </ChakraLink>
          <a href="#footer" style={{ color: 'white', marginRight: '4', textDecoration: 'none' }}>
            Contact Us
          </a>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;


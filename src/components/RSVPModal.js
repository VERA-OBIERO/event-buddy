import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

//component to display a modal for successful RSVP
const RSVPModal = ({ isOpen, onClose }) => {

    //layout of the modal
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Successful RSVP</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          You have successfully RSVP'd. Enjoy the event!
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RSVPModal;

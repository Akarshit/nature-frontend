import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { useUIStore } from 'brain/store.js';

function RegisterPhone() {
  const phone = useUIStore((state) => state.contactInput.phone);
  const setContactInput = useUIStore((state) => state.setContactInput);
  return (
    <PhoneInput
      country={'us'}
      onlyCountries={['us', 'ca']}
      placeholder="Enter phone number"
      value={phone}
      onChange={setContactInput}
      countryCodeEditable={false}
    />
  );
}

export default function Contact() {
  const user = useUIStore((state) => state.user);
  const contactModal = useUIStore((state) => state.contactModal);
  const toggleContactModal = useUIStore((state) => state.toggleContactModal);
  const registerContact = useUIStore((state) => state.registerContact);
  const verifyContact = useUIStore((state) => state.verifyContact);
  const handleClick = () => {
    if (contactModal === 'register') {
      registerContact();
    }
  };
  return (
    <Modal isOpen={contactModal} onClose={toggleContactModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add phone number</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterPhone />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClick}>
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

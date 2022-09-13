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
  Divider,
  Link,
} from '@chakra-ui/react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OtpInput from 'react-otp-input';

import { useUIStore } from '#store';

function RegisterPhone() {
  const contactId = useUIStore((state) => state.contactInput.contactId);
  const setContactIdInput = useUIStore((state) => state.setContactIdInput);
  return (
    <Flex align="center">
      <Text mr={4} fontWeight="bold">
        Phone:
      </Text>
      <PhoneInput
        country={'us'}
        onlyCountries={['us', 'ca']}
        placeholder="Enter phone number"
        value={contactId}
        onChange={setContactIdInput}
        countryCodeEditable={false}
      />
    </Flex>
  );
}

function VerifyPhone() {
  const otp = useUIStore((state) => state.otp);
  const setOTP = useUIStore((state) => state.setOTP);
  const registerContact = useUIStore((state) => state.registerContact);
  return (
    <Flex direction="column">
      <Flex align="center" w="100%" justify="center">
        <OtpInput
          value={otp}
          onChange={setOTP}
          numInputs={4}
          separator={
            <Divider
              w={2}
              borderWidth={1}
              borderColor={'blackAlpha.500'}
              m={1}
            />
          }
          inputStyle={{
            borderColor: 'lightgrey',
            borderWidth: 1,
            borderBottomWidth: 2,
            width: '3rem',
            height: '4rem',
            margin: 5,
            borderRadius: 6,
          }}
          shouldAutoFocus
        />
      </Flex>
      <Flex justify={'center'} mt={2} fontStyle="italic">
        <Text>
          Didn&apos;t get the OTP?
          <Link
            ml={2}
            onClick={registerContact}
            color="blue"
            textDecor={'underline'}
          >
            Resend
          </Link>
        </Text>
      </Flex>
    </Flex>
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
    } else if (contactModal === 'verify') {
      verifyContact();
    }
  };
  const actionText = contactModal === 'register' ? 'Send OTP' : 'Submit';
  const heading =
    contactModal === 'register' ? 'Add Phone Number' : 'Verify OTP';
  return (
    <Modal isOpen={contactModal} onClose={toggleContactModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {contactModal === 'register' ? <RegisterPhone /> : <VerifyPhone />}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClick}>
            {actionText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

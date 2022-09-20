import 'react-phone-input-2/lib/style.css';

import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { GLogin, GLoginDone } from 'components';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { useEffect, useState } from 'react';

import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import { useUIStore } from '#store';

function RegisterPhone({ setEnableSubmit }) {
  const contactId = useUIStore((state) => state.contactInput.contactId);
  const setContactIdInput = useUIStore((state) => state.setContactIdInput);
  const setShowPricingModal = useUIStore((state) => state.setShowPricingModal);
  const toggleContactModal = useUIStore((state) => state.toggleContactModal);
  const user = useUIStore((state) => state.user);
  const sub = useUIStore((state) => state.sub);
  useEffect(() => {
    checkValidity(contactId);
    if (user?.contacts?.[0]?.verified === true) {
      setShowPricingModal(true);
      toggleContactModal(false);
    }
  }, [user, sub]);
  const checkValidity = (inputNumber) => {
    setContactIdInput(inputNumber);
    setEnableSubmit(isValidPhoneNumber(`+${inputNumber}`));
  };
  return (
    <Flex my={6} direction="column" align={'center'}>
      <Flex position="relative">
        <Heading
          color={'green.500'}
          fontFamily="sans-serif"
          fontWeight={500}
          mb={6}
          size="lg"
        >
          Step 1:
        </Heading>
        {!!user && (
          <CheckCircleIcon color="green.500" position={'absolute'} right={-5} />
        )}
      </Flex>
      <Flex mb={4} align="center">
        {!!user ? <GLoginDone /> : <GLogin />}
      </Flex>
      <Divider my={8} borderBottomWidth={1} borderColor="green.500" w="80%" />
      <Flex direction={'column'} align="center">
        <Heading
          color={'green.500'}
          fontFamily="sans-serif"
          fontWeight={500}
          mb={6}
          size="lg"
        >
          Step 2:
        </Heading>

        <Flex align={'center'}>
          <Text mr={4} fontWeight="bold" color={'blackAlpha.700'}>
            Phone:
          </Text>
          <PhoneInput
            country={'us'}
            onlyCountries={['us', 'ca']}
            placeholder="Enter phone number"
            value={contactId}
            onChange={checkValidity}
            countryCodeEditable={false}
            buttonStyle={{
              paddingLeft: 5,
              paddingRight: 5,
            }}
            inputStyle={{
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 54,
              fontSize: '1.1em',
            }}
          />
        </Flex>
        <Text
          fontStyle={'italic'}
          fontSize="sm"
          mt={2}
          color={'blackAlpha.800'}
        >
          For sending updates for available reservation
        </Text>
      </Flex>
    </Flex>
  );
}

function VerifyPhone() {
  const contactId = useUIStore((state) => state.contactInput.contactId);
  const otp = useUIStore((state) => state.otp);
  const setOTP = useUIStore((state) => state.setOTP);
  const registerContact = useUIStore((state) => state.registerContact);
  const contactModalError = useUIStore((state) => state.contactModalError);
  return (
    <Flex direction="column" align={'center'} fontFamily="sans-serif">
      <Flex my={2}>
        Enter OTP sent to{' '}
        {parsePhoneNumber(`+${contactId}`).formatInternational()}
      </Flex>
      <OtpInput
        value={otp}
        onChange={setOTP}
        numInputs={4}
        separator={
          <Divider w={2} borderWidth={1} borderColor={'blackAlpha.500'} m={1} />
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
      <Flex
        align={'center'}
        my={2}
        opacity={contactModalError ? 1 : 0}
        transition="opacity 0.3s linear"
      >
        <WarningIcon mr={2} color="red.600" />
        <Text>{contactModalError}</Text>
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
  const showContactModal = useUIStore((state) => state.showContactModal);
  const setShowPricingModal = useUIStore((state) => state.setShowPricingModal);
  const toggleContactModal = useUIStore((state) => state.toggleContactModal);
  const registerContact = useUIStore((state) => state.registerContact);
  const verifyContact = useUIStore((state) => state.verifyContact);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const handleClick = async () => {
    if (showContactModal === 'register') {
      registerContact();
    } else if (showContactModal === 'verify') {
      await verifyContact();
      setShowPricingModal(true);
    }
  };
  const actionText = showContactModal === 'register' ? 'Send OTP' : 'Submit';
  const heading =
    showContactModal === 'register' ? 'Create an account' : 'Verify OTP';
  return (
    <Modal isOpen={showContactModal} onClose={() => toggleContactModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showContactModal === 'register' ? (
            <RegisterPhone setEnableSubmit={setEnableSubmit} />
          ) : (
            <VerifyPhone setEnableSubmit={setEnableSubmit} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            variant="ghost"
            mr={3}
            onClick={() => toggleContactModal(false)}
          >
            Close
          </Button>
          <Button
            colorScheme="green"
            mr={3}
            onClick={handleClick}
            disabled={!enableSubmit}
          >
            {actionText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

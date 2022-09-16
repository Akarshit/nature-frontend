import 'react-phone-input-2/lib/style.css';

import { BASIC_FEATURES, PAY_AS_YOU_GO_FEATURES } from 'brain/constants';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { GLogin, GLoginDone } from 'components';
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from 'react-icons/io5';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import { useState } from 'react';
import { useUIStore } from '#store';

function RegisterPhone({ setEnableSubmit }) {
  const contactId = useUIStore((state) => state.contactInput.contactId);
  const setContactIdInput = useUIStore((state) => state.setContactIdInput);
  const user = useUIStore((state) => state.user);
  const checkValidity = (inputNumber) => {
    setContactIdInput(inputNumber);
    setEnableSubmit(isValidPhoneNumber(`+${inputNumber}`));
  };
  return (
    <Flex my={6} direction="column" align={'center'}>
      <Flex position="relative">
        <Heading
          color={'gray.600'}
          fontFamily="sans-serif"
          fontWeight={500}
          mb={5}
          size="lg"
        >
          Step 1
        </Heading>
        {!!user && (
          <CheckCircleIcon color="green.500" position={'absolute'} right={-5} />
        )}
      </Flex>
      <Flex mb={4} align="center">
        {!!user ? <GLoginDone /> : <GLogin />}
      </Flex>
      <Flex direction={'column'} align="center">
        <Heading
          color={'gray.600'}
          fontFamily="sans-serif"
          fontWeight={500}
          mb={5}
          size="lg"
        >
          Step 2
        </Heading>

        <Flex align={'center'}>
          <Text mr={4} fontWeight="bold">
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
      </Flex>
    </Flex>
  );
}

function ShowPricing() {
  //const toast = useToast();
  //const contactId = useUIStore((state) => state.contactInput.contactId);
  //const otp = useUIStore((state) => state.otp);
  //const setOTP = useUIStore((state) => state.setOTP);
  //const registerContact = useUIStore((state) => state.registerContact);
  //const contactModalError = useUIStore((state) => state.contactModalError);
  return (
    <Flex
      direction="row"
      align={'center'}
      fontFamily="Roboto, Arial, sans-serif"
    >
      <Flex
        direction="column"
        w="50%"
        p={2}
        mx={5}
        bgColor="dimgray"
        color="white"
        borderRadius={10}
      >
        <Heading size="lg" align="center" p={1} mb={2}>
          Pay As You Go
        </Heading>
        <Text fontSize="2em" justifyContent="center" p={5} display="flex">
          $<Text fontSize="2em">10</Text>
        </Text>
        <List spacing={3} p={3}>
          {PAY_AS_YOU_GO_FEATURES.map((feature) => {
            return (
              <ListItem key={feature.key} display="flex">
                <ListIcon
                  boxSize={6}
                  as={
                    feature.present
                      ? IoCheckmarkCircleSharp
                      : IoCloseCircleSharp
                  }
                  color={feature.present ? 'white' : 'black'}
                />
                <Text>{feature.text}</Text>
              </ListItem>
            );
          })}
        </List>
        <Flex justify="center">
          <Button
            color="dimgray"
            bgColor="white"
            size="md"
            width="50%"
            align="center"
            //onClick={handleClick}
            variant="outline"
          >
            Select
          </Button>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        w="50%"
        p={2}
        mx={5}
        bgColor="green"
        color="white"
        borderRadius={10}
      >
        <Heading size="lg" align="center" p={1} mb={2}>
          Subscribe
        </Heading>
        <Flex justify="space-around">
          <Text fontSize="2em" justifyContent="center" p={5} display="flex">
            $<Text fontSize="2em">15</Text>/mth
          </Text>
          <Text fontSize="2em" justifyContent="center" p={5} display="flex">
            $<Text fontSize="2em">120</Text>/yr
          </Text>
        </Flex>
        <List spacing={3} p={3}>
          {BASIC_FEATURES.map((feature) => {
            return (
              <ListItem key={feature.key} display="flex">
                <ListIcon
                  boxSize={6}
                  as={
                    feature.present
                      ? IoCheckmarkCircleSharp
                      : IoCloseCircleSharp
                  }
                  color={feature.present ? 'white' : 'black'}
                />
                <Text>{feature.text}</Text>
              </ListItem>
            );
          })}
        </List>
        <Flex justify="space-around">
          <Button
            color="green"
            bgColor="white"
            size="md"
            width="45%"
            //onClick={handleClick}
            variant="outline"
          >
            Select Monthly
          </Button>
          <Button
            color="darkgreen"
            bgColor="white"
            size="md"
            width="45%"
            //onClick={handleClick}
            variant="outline"
          >
            Select Yearly
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function Pricing() {
  const showPricingModal = useUIStore((state) => state.showPricingModal);
  const togglePricingModal = useUIStore((state) => state.togglePricingModal);
  //const registerContact = useUIStore((state) => state.registerContact);
  //const verifyContact = useUIStore((state) => state.verifyContact);
  //const [enableSubmit, setEnableSubmit] = useState(false);
  // const handleClick = () => {
  //   if (showContactModal === 'register') {
  //     registerContact();
  //   } else if (showContactModal === 'verify') {
  //     verifyContact();
  //   }
  // };
  // const actionText = showContactModal === 'register' ? 'Send OTP' : 'Submit';
  const heading = 'Pricing Plan';
  return (
    <Modal isOpen={true} onClose={() => togglePricingModal(false)} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ShowPricing />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            variant="ghost"
            mr={3}
            onClick={() => togglePricingModal(false)}
          >
            Close
          </Button>
          {/* <Button
            colorScheme="teal"
            mr={3}
            //onClick={handleClick}
            //disabled={!enableSubmit}
          >
            {actionText}
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

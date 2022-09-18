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
  Stack,
  Text,
} from '@chakra-ui/react';
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from 'react-icons/io5';

import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

function ShowPricing() {
  const { setPlanSlug, setShowPricingModal } = useUIStore(
    (state) => state,
    shallow
  );
  const router = useRouter();
  const handleClick = (slug) => {
    setShowPricingModal(false);
    setPlanSlug(slug);
    router.push('/checkout');
  };
  return (
    <Flex
      direction={['column', 'row']}
      align={'stretch'}
      fontFamily="Roboto, Arial, sans-serif"
    >
      <Flex
        direction="column"
        w={['100%', '50%']}
        p={2}
        mx={[0, 5]}
        my={[5, 0]}
        bgColor="dimgray"
        color="white"
        borderRadius={10}
      >
        <Heading size="lg" align="center" p={1} mb={2}>
          Pay As You Go
        </Heading>
        <Text
          fontSize="2em"
          justifyContent="center"
          p={5}
          display="flex"
          alignItems={'baseline'}
        >
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
        <Flex justify="center" flexGrow={1} alignItems="flex-end">
          <Button
            color="dimgray"
            bgColor="white"
            size="md"
            width="50%"
            align="center"
            onClick={() => handleClick('pay-as-you-go')}
            variant="outline"
            mb={[4, 16]}
          >
            Select
          </Button>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        w={['100%', '50%']}
        p={2}
        mx={[0, 5]}
        bgColor="green"
        color="white"
        borderRadius={10}
        position="relative"
      >
        <div class="ribbon">
          <span>Save 33%</span>
        </div>
        <Heading size="lg" align="center" p={1} mb={2}>
          Subscribe
        </Heading>
        <Flex justify="space-around">
          <Text
            fontSize="2em"
            justifyContent="center"
            p={5}
            display="flex"
            alignItems={'baseline'}
          >
            $
            <Text fontSize="2em" mr={1}>
              15
            </Text>
            /mth
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
        <Stack
          justify="space-around"
          direction={'column'}
          w="100%"
          align={'center'}
          spacing={4}
          mt={[2, 20]}
          mb={[2, 10]}
        >
          <Button
            color="green"
            bgColor="white"
            size="md"
            width="60%"
            onClick={() => handleClick('basic-monthly')}
            variant="outline"
          >
            Select Monthly for $15
          </Button>
          <Button
            color="red"
            bgColor="white"
            size="md"
            width="60%"
            onClick={() => handleClick('basic-yearly')}
            variant="outline"
          >
            Select Yearly for $120
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default function Pricing() {
  const showPricingModal = useUIStore((state) => state.showPricingModal);
  const togglePricingModal = useUIStore((state) => state.togglePricingModal);

  return (
    <Modal
      isOpen={showPricingModal}
      onClose={() => togglePricingModal(false)}
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select A Plan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ShowPricing />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

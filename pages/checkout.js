import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { NavBar, PaymentWidget, TrackerCheckoutDetails } from 'components';

import { useUIStore } from '#store';

export default function Checkout() {
  const createTracker = useUIStore((state) => state.createTracker);
  return (
    <Flex align="stretch" direction="column" h="100vh">
      <NavBar></NavBar>
      <Flex direction="row" h="90vh">
        <Flex justify="top" align="center" direction="column" w="50%">
          <Flex h="30vh" p={2}>
            <Image
              objectFit="cover"
              src="/hero.jpg"
              alt="Dan Abramov"
              align="stretch"
            />
          </Flex>
          <Flex w="50%" p={2}>
            <TrackerCheckoutDetails></TrackerCheckoutDetails>
          </Flex>
        </Flex>
        <Flex align="stretch" justify="center" direction="row" w="50%">
          <PaymentWidget />
        </Flex>
      </Flex>
    </Flex>
  );
}

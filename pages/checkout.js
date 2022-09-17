import {
  Billing,
  NavBar,
  PaymentWidget,
  TrackerCheckoutDetails,
} from 'components';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { useUIStore } from '#store';

export default function Checkout() {
  return (
    <Flex
      align="stretch"
      direction="column"
      bgColor={'blackAlpha.100'}
      minH="100vh"
    >
      <NavBar></NavBar>
      <Flex direction="row">
        <Flex
          justify="top"
          direction="column"
          w="50%"
          pr={8}
          pl={14}
          align="center"
        >
          <Flex
            direction="column"
            w="80%"
            m={6}
            p={5}
            bgColor="white"
            borderRadius={10}
            boxShadow="dark-lg"
          >
            <PaymentWidget />
            <Billing />
          </Flex>
        </Flex>
        <Flex direction="column" w="50%" justify={'space-between'} pb={20}>
          <TrackerCheckoutDetails />
        </Flex>
      </Flex>
    </Flex>
  );
}

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
    <Flex align="stretch" direction="column" h="100vh" bgColor={'white'}>
      <NavBar></NavBar>
      <Flex direction="row" h="100vh">
        <Flex
          justify="top"
          direction="column"
          w="50%"
          pr={8}
          pl={14}
          bgColor="blackAlpha.50"
        >
          <PaymentWidget />
          <Billing />
        </Flex>
        <Flex direction="column" w="50%" justify={'space-between'} pb={20}>
          <TrackerCheckoutDetails />
        </Flex>
      </Flex>
    </Flex>
  );
}

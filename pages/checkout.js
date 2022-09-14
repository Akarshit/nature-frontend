import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { NavBar, PaymentWidget } from 'components';

import { useUIStore } from '#store';

export default function Checkout() {
  return (
    <Flex align="stretch" direction="column" h="100vh">
      <NavBar />
      <Flex justify="center" align="center" direction="column" h="80vh">
        <PaymentWidget />
      </Flex>
    </Flex>
  );
}

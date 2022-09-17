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
    <Flex direction={'column'} minH="100vh" bgColor={'blackAlpha.100'}>
      <NavBar></NavBar>
      <Flex align="stretch" direction="column" justify={'center'}>
        <Flex direction={['column', 'row']}>
          <Flex
            justify="top"
            direction="column"
            w={['100%', '50%']}
            pr={[0, 8]}
            pl={[0, 14]}
            align="center"
          >
            <Flex
              direction="column"
              w={['unset', '80%']}
              mx={[4, 6]}
              my={[4, 6]}
              p={[4, 5]}
              bgColor="white"
              borderRadius={10}
              boxShadow="dark-lg"
            >
              <PaymentWidget />
              <Billing />
            </Flex>
          </Flex>
          <Flex
            direction="column"
            w={['100%', '50%']}
            justify={'space-between'}
          >
            <TrackerCheckoutDetails />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

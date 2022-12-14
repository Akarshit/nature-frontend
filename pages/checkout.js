import {
  Billing,
  NavBar,
  PaymentAction,
  PaymentWidget,
  TrackerCheckoutDetails,
} from 'components';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useUIStore } from '#store';

export default function Checkout() {
  const sub = useUIStore((state) => state.sub);
  const noPayment = !!sub?._id;
  return (
    <Flex direction={'column'} minH="100vh" bgColor={'blackAlpha.100'}>
      <NavBar path="reserve.png"></NavBar>
      <Flex align="stretch" direction="column" justify={'center'}>
        <Flex direction={['column', 'row']} justify="center">
          {!noPayment && (
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
          )}
          <Flex
            direction={['column']}
            w={['100%', '50%']}
            justify={'space-evenly'}
          >
            <TrackerCheckoutDetails />
            <Flex w="100%" justify={'center'}>
              <PaymentAction />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

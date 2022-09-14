import { useUIStore } from '#store';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { NavBar, TrackerCheckoutDetails } from 'components';

export default function Checkout() {
  return (
    <Flex
      align="stretch"
      direction="column"
      h="100vh"
      //bgImage="url('hero.jpg')"
      //bgSize={'cover'}
    >
      <NavBar></NavBar>
      <Flex direction="row" h="90vh">
        <Flex justify="top" align="center" direction="column" w="50%">
          <Flex h="30vh" p={2}>
            <Image
              //boxSize="150px"
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
        <Flex
          align="stretch"
          justify="center"
          direction="row"
          maxW="50%"
        ></Flex>
      </Flex>
    </Flex>
  );
}

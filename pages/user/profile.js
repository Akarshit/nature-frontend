import { useUIStore } from '#store';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { NavBar, TrackWidget } from 'components';

export default function Home() {
  return (
    <Flex
      align="stretch"
      direction="column"
      h="100vh"
      bgImage="url('hero.jpg')"
      bgSize={'cover'}
    >
      <NavBar></NavBar>
      <Flex justify="center" align="center" direction="row" h="80vh">
        <TrackWidget></TrackWidget>
      </Flex>
      <Flex align="stretch" justify="center" direction="row"></Flex>
    </Flex>
  );
}
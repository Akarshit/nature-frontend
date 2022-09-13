import { useUIStore } from '#store';
import { Box, Flex, Heading, Image, Button, Text } from '@chakra-ui/react';
import { TrackWidget, NavBar } from 'components';

export default function Home() {
  const bears = useUIStore((state) => state.bears);
  const increasePopulation = useUIStore((state) => state.increasePopulation);
  return (
    <Flex
      align="stretch"
      direction="column"
      h="100vh"
      bgImage="url('hero.jpg')"
      bgSize={'cover'}
    >
      <NavBar></NavBar>
      <Flex justify="center" align="center" direction="column" h="80vh">
        <TrackWidget></TrackWidget>
      </Flex>
      <Flex align="stretch" justify="center" direction="row"></Flex>
    </Flex>
  );
}

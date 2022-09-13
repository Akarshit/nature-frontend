import { useUIStore } from '#store';
import { Box, Flex, Heading, Image, Button, Text } from '@chakra-ui/react';
import { TrackWidget, NavBar } from 'components';

export default function Home() {
  const bears = useUIStore((state) => state.bears);
  const increasePopulation = useUIStore((state) => state.increasePopulation);
  return (
    <Flex align="stretch" direction="column" h="100vh">
      <NavBar></NavBar>
      <Flex
        direction="column"
        align="stretch"
        bgImage="url('hero.gif')"
        bgSize="cover"
        grow={0.3}
      ></Flex>
      <Flex justify="space-around" align="center" direction="column">
        <Heading
          my="5vh"
          color="black"
          flexGrow={2}
          fontFamily="Andale Mono"
          grow="1"
        >
          RESERVE NATURE
        </Heading>
        <TrackWidget></TrackWidget>
      </Flex>
      <Flex align="stretch" justify="center" direction="row"></Flex>
    </Flex>
  );
}

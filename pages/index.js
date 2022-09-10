import { useUIStore } from 'brain/store.js';
import { Box, Flex, Heading, Image, Button, Text } from '@chakra-ui/react';

export default function Home() {
  const bears = useUIStore((state) => state.bears);
  const increasePopulation = useUIStore((state) => state.increasePopulation);
  return (
    <Flex align="stretch" direction="column" h="100vh">
      <Flex
        justify="space-around"
        align="center"
        direction="column"
        grow="3"
        bgImage="url('hero.gif')"
        bgSize="cover"
      >
        <Heading mt="10vh" color="white" flexGrow={2} fontFamily="Andale Mono">
          RESERVE NATURE
        </Heading>

        <Text fontSize="6xl" color="white" flexGrow={3} fontFamily="serif">
          Launching Soon
        </Text>
      </Flex>
      <Flex align="stretch" justify="center" direction="row"></Flex>
    </Flex>
  );
}

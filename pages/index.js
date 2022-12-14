import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { NavBar, TrackWidget } from 'components';

import { useEffect } from 'react';
import { useUIStore } from '#store';

export default function Home() {
  const getPlans = useUIStore((state) => state.getPlans);
  useEffect(() => {
    getPlans();
  }, []);
  return (
    <Flex
      align="stretch"
      direction="column"
      h="100vh"
      bgImage="url('hero.jpg')"
      bgSize={'cover'}
    >
      <NavBar path="reserve.png"></NavBar>
      <Flex justify="center" align="center" direction="column" h="80vh">
        <TrackWidget></TrackWidget>
      </Flex>
      <Flex align="stretch" justify="center" direction="row"></Flex>
    </Flex>
  );
}

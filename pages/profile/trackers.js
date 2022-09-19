import { Flex, Heading, Text } from '@chakra-ui/react';
import { NavBar, TrackerCard } from 'components';
import { useEffect, useState } from 'react';

import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

export default function Trackers() {
  const { getTrackers } = useUIStore((state) => state, shallow);
  useEffect(() => {
    getTrackers();
  }, []);
  return (
    <Flex direction={'column'} minH="100vh" bgColor={'blackAlpha.100'}>
      <NavBar path="/reserve.png"></NavBar>
      <Heading
        size="lg"
        align="center"
        p={1}
        m={5}
        fontFamily="Roboto, Arial, sans-serif"
      >
        YOUR TRACKERS
      </Heading>
      <Flex direction="column" justify="center" p={5} flexFlow="wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <TrackerCard key={item} />
        ))}
      </Flex>
    </Flex>
  );
}

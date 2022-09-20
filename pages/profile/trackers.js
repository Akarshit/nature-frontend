import { Flex, Heading, Text } from '@chakra-ui/react';
import { NavBar, TrackerCard } from 'components';
import { useEffect, useState } from 'react';

import { orderBy } from 'lodash';
import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

export default function Trackers() {
  const { getTrackers, trackers } = useUIStore((state) => state, shallow);
  useEffect(() => {
    getTrackers();
  }, []);
  const currentTrackers = orderBy(
    trackers.filter((tracker) => ['active', 'paused'].includes(tracker.status)),
    ['status', 'startDate'],
    ['asc', 'desc']
  );
  const expiredTrackers = orderBy(
    trackers.filter((tracker) =>
      ['expired', 'deleted'].includes(tracker.status)
    ),
    ['startDate'],
    ['desc']
  );

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
        Current Tracker
      </Heading>
      <Flex direction="column" justify="center" p={5} flexFlow="wrap">
        {currentTrackers.map((t) => (
          <TrackerCard key={t._id} tracker={t} />
        ))}
      </Flex>
      <Heading
        size="lg"
        align="center"
        p={1}
        m={5}
        fontFamily="Roboto, Arial, sans-serif"
      >
        Previous Trackers
      </Heading>
      <Flex direction="column" justify="center" p={5} flexFlow="wrap">
        {expiredTrackers.map((t) => (
          <TrackerCard key={t._id} tracker={t} />
        ))}
      </Flex>
    </Flex>
  );
}

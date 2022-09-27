import { Flex, Heading, Text } from '@chakra-ui/react';
import { GcCard, NavBar, ProfileNav } from 'components';
import { useEffect, useState } from 'react';

import { orderBy } from 'lodash';
import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

export default function Trackers() {
  const { getGiftCards, giftCards } = useUIStore((state) => state, shallow);
  useEffect(() => {
    getGiftCards();
  }, []);
  const gcs = orderBy(giftCards, ['status', 'startDate'], ['asc', 'desc']);
  return (
    <Flex direction={'column'}>
      <Heading
        size="lg"
        align="center"
        p={1}
        m={5}
        fontFamily="Roboto, Arial, sans-serif"
      >
        All Gift Cards
      </Heading>
      <Flex direction="column" justify="center" p={5} flexFlow="wrap">
        {gcs.map((gc) => (
          <GcCard key={gcs._id} gc={gc} />
        ))}
      </Flex>
    </Flex>
  );
}

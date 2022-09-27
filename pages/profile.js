import { Flex, Heading, Text } from '@chakra-ui/react';
import {
  GiftCards,
  NavBar,
  ProfileNav,
  Subscriptions,
  Trackers,
} from 'components';
import { useEffect, useState } from 'react';

import { orderBy } from 'lodash';
import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

export default function Profile() {
  const profileTab = useUIStore((state) => state.profileTab);
  let content = null;
  if (profileTab === 'trackers') {
    content = <Trackers />;
  } else if (profileTab === 'subscriptions') {
    content = <Subscriptions />;
  } else {
    content = <GiftCards />;
  }
  return (
    <Flex direction={'column'} minH="100vh" bgColor={'blackAlpha.100'}>
      <NavBar path="/reserve.png"></NavBar>
      <Flex>
        <ProfileNav />
        <Flex direction={'column'} flexGrow={1}>
          {content}
        </Flex>
      </Flex>
    </Flex>
  );
}

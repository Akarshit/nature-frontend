import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Contact, Entry, Loading, Pricing, Toast } from 'components';

import TokenService from '#services/token';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

function ProfileTab({ children, onClick }) {
  return (
    <Button variant={'ghost'} borderRadius={0} px={10} py={8} onClick={onClick}>
      {children}
    </Button>
  );
}
export default function ProfileNav(props) {
  const setProfileTab = useUIStore((state) => state.setProfileTab);

  const tabs = [
    {
      label: 'My Trackers',
      onClick: () => setProfileTab('trackers'),
    },
    {
      label: 'My Subscription',
      onClick: () => setProfileTab('subscriptions'),
    },
    {
      label: 'Gift Cards',
      onClick: () => setProfileTab('gift-cards'),
    },
  ];

  return (
    <Flex direction={'column'} bgColor="green.300" h="100vh">
      <Heading fontSize={'xl'} py={4} alignSelf="center">
        Menu
      </Heading>
      {tabs.map((tab) => {
        return (
          <Flex key={tab.label} direction="column">
            <ProfileTab onClick={tab.onClick}>{tab.label}</ProfileTab>
            <Divider />
          </Flex>
        );
      })}
    </Flex>
  );
}

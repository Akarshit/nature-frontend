import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Contact, Entry } from 'components';

import TokenService from '#services/token';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

function UserDropdownRow({ name, action }) {
  return (
    <Flex
      onClick={action}
      w="100%"
      px={4}
      py={3}
      _hover={{
        cursor: 'pointer',
        backgroundColor: 'blackAlpha.50',
      }}
    >
      <Text>{name}</Text>
    </Flex>
  );
}

function UserDropdown() {
  const logoutUser = useUIStore((state) => state.logoutUser);
  const showUserDropdown = useUIStore((state) => state.showUserDropdown);
  const router = useRouter();
  if (!showUserDropdown) return null;
  return (
    <Flex position="relative">
      <Flex
        direction={'column'}
        position="absolute"
        mt={2}
        minW="10em"
        right={0}
        backgroundColor="white"
        align={'center'}
        boxShadow="0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)"
      >
        <UserDropdownRow
          name="Profile"
          action={() => router.push('/profile/trackers')}
        />
        <Divider w={'90%'} />
        <UserDropdownRow name="Logout" action={logoutUser} />
      </Flex>
    </Flex>
  );
}

export default function UserTab() {
  const user = useUIStore((state) => state.user);
  const toggleUserDropdown = useUIStore((state) => state.toggleUserDropdown);
  const showUserDropdown = useUIStore((state) => state.showUserDropdown);
  const ExpandIcon = showUserDropdown ? ChevronUpIcon : ChevronDownIcon;
  return (
    <Flex
      direction={'column'}
      onClick={() => toggleUserDropdown()}
      onBlur={toggleUserDropdown}
    >
      <Flex
        align="stretch"
        direction="row"
        alignItems={'center'}
        p={2}
        transition="transform .2s"
        _hover={{
          transform: 'scale(1.2)',
          cursor: 'pointer',
        }}
      >
        <Avatar size="sm" src={user.picture} />
        <ExpandIcon boxSize={6} ml={2} />
      </Flex>
      <UserDropdown />
    </Flex>
  );
}

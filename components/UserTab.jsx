import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
  Avatar,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useUIStore } from '#store';
import { Entry, Contact } from 'components';
import { useEffect } from 'react';
import TokenService from '#services/token';

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
  const toggleContactModal = useUIStore((state) => state.toggleContactModal);
  if (!showUserDropdown) return null;
  return (
    <Flex position="relative">
      <Flex
        direction={'column'}
        position="absolute"
        mt={4}
        minW="10em"
        right={0}
        backgroundColor="white"
        align={'center'}
        boxShadow="0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)"
      >
        <UserDropdownRow
          name="Add Contact"
          action={() => toggleContactModal('register')}
        />
        <Divider w={'90%'} />
        <UserDropdownRow name="Profile" action={() => null} />
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
      onBlur={() => {
        console.log('Blurred');
        toggleUserDropdown();
      }}
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

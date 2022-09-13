import { Avatar, Box, Button, Flex, Icon, Text } from '@chakra-ui/react';

import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import { useUIStore } from '#store';

export default function GLoginDone() {
  const user = useUIStore((state) => state.user);
  if (!user) return null;
  return (
    <Flex
      borderWidth={1}
      width="max-content"
      py={1.5}
      px={2}
      align="center"
      backgroundColor={'white'}
      borderRadius={4}
    >
      <Avatar size="xs" src={user.picture} mr={2} />
      <Flex direction="column">
        <Text
          color="#3c4043"
          fontFamily="Roboto"
          fontWeight={600}
          lineHeight="10px"
          fontSize="12px"
          width="max-content"
        >
          Signed in as {user.firstName ?? user.name}
        </Text>
        <Text color="#5f6368" fontFamily="Roboto" fontSize="11px">
          {user.email}
        </Text>
      </Flex>
      <Icon as={FcGoogle} ml={4} boxSize={5} />
    </Flex>
  );
}

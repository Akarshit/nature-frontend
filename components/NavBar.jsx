import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Contact, Entry, Pricing, Toast } from 'components';

import TokenService from '#services/token';
import { useEffect } from 'react';
import { useUIStore } from '#store';

export default function NavBar() {
  const toggleEntryModal = useUIStore((state) => state.toggleEntryModal);
  const setUser = useUIStore((state) => state.setUser);
  // Getting user from localStorage
  useEffect(() => {
    const user = TokenService.getUser();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      <Toast />
      <Contact />
      <Pricing />
      <Flex
        align="stretch"
        direction="row"
        justify="space-between"
        px={5}
        py={4}
        backgroundColor="white"
      >
        <Heading size="xl" color="black" fontFamily="Andale Mono">
          Reserve Nature
        </Heading>
        <Entry></Entry>
      </Flex>
    </>
  );
}

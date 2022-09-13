import { Box, Flex, Heading, Image, Button, Text } from '@chakra-ui/react';
import { useUIStore } from '#store';
import { Entry, Contact } from 'components';
import { useEffect } from 'react';
import TokenService from '#services/token';

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
      <Contact />
      <Flex
        align="stretch"
        direction="row"
        justify="space-between"
        px={5}
        py={4}
      >
        <Flex></Flex>
        {/* <Button onClick={() => toggleEntryModal('login')}>Login</Button> */}
        <Entry></Entry>
      </Flex>
    </>
  );
}

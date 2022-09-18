import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Contact, Entry, Loading, Pricing, Toast } from 'components';

import TokenService from '#services/token';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

export default function NavBar() {
  const setUser = useUIStore((state) => state.setUser);
  const router = useRouter();
  // Getting user from localStorage
  useEffect(() => {
    const user = TokenService.getUser();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <div>
      <Contact />
      <Pricing />
      <Loading />
      <Flex
        align="center"
        direction="row"
        justify="space-between"
        backgroundColor="white"
        pr={4}
      >
        <Heading
          size={['md', 'xl']}
          color="black"
          fontFamily="Andale Mono"
          onClick={() => router.push('/')}
          cursor="pointer"
          display={'flex'}
          alignItems="center"
        >
          <Image
            src="reserve.png"
            alt="Reserve Nature"
            boxSize={['80px', '70px']}
            mr={3}
          />
          Reserve Nature
        </Heading>
        <Entry />
      </Flex>
    </div>
  );
}

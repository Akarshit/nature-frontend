import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Contact, Entry, Loading, Pricing, Toast } from 'components';

import TokenService from '#services/token';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

export default function NavBar() {
  const updateUser = useUIStore((state) => state.updateUser);
  const router = useRouter();
  // Getting user from localStorage
  useEffect(() => {
    updateUser();
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
          onClick={() => router.push('/')}
          cursor="pointer"
          display={'flex'}
          alignItems="center"
          fontFamily="sans-serif"
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

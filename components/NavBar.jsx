import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Contact, Entry, Loading, Pricing, Toast } from 'components';

import TokenService from '#services/token';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

export default function NavBar(props) {
  const setUser = useUIStore((state) => state.setUser);
  const updateUser = useUIStore((state) => state.updateUser);
  const router = useRouter();
  const { path } = props;
  // Getting user from localStorage
  useEffect(() => {
    updateUser();
  }, []);

  return (
    <Box>
      <Contact />
      <Pricing />
      <Flex direction={'column'}>
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
              src={path}
              alt="Reserve Nature"
              boxSize={['80px', '70px']}
              mr={3}
            />
            Reserve Nature
          </Heading>
          <Entry />
        </Flex>
        <Box pos="relative">
          <Loading />
        </Box>
      </Flex>
    </Box>
  );
}

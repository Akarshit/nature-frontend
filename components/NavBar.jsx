import { Box, Flex, Heading, Image, Button, Text } from '@chakra-ui/react';
import { useUIStore } from 'brain/store.js';
import { Entry } from 'components';

export default function NavBar() {
  const toggleEntryModal = useUIStore((state) => state.toggleEntryModal);
  return (
    <>
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

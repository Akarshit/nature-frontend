import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
  Input,
} from '@chakra-ui/react';
import Suggest from './Suggest';

export default function TrackWidget() {
  //const bears = useUIStore((state) => state.bears);
  //const increasePopulation = useUIStore((state) => state.increasePopulation);
  return (
    <Flex
      align="stretch"
      direction="column"
      boxShadow="0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)"
      borderRadius="8px"
      p={2}
    >
      <Flex align="stretch" direction="column">
        <Flex direction="row" justify="left" align="stretch"></Flex>
        <Flex direction="row" justify="space-around" w="75vw">
          <Input placeholder="Search" size="md" mx={3} my={2} flexShrink={2} />
          <Input
            placeholder="Checkin"
            size="md"
            type="date"
            mx={3}
            my={2}
            flexShrink={3}
          />
          <Input
            placeholder="Checkout"
            size="md"
            type="date"
            mx={3}
            my={2}
            flexShrink={3}
          />
          <Button
            colorScheme="teal"
            size="md"
            width="75%"
            mx={3}
            my={2}
            flexShrink={3}
          >
            Track
          </Button>
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
}

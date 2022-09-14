import { Flex, Heading, Text } from '@chakra-ui/react';
import { useUIStore } from '#store';

export default function TrackerCheckoutDetails() {
  const groupSize = useUIStore((state) => state.trackerInput.groupSize);
  const type = useUIStore((state) => state.trackerInput.type);
  const campground = useUIStore((state) => state.searchInput);
  const checkin = useUIStore((state) => state.trackerInput.startDate);
  const checkout = useUIStore((state) => state.trackerInput.endDate);

  return (
    <Flex w="100%" position="relative">
      <Flex
        w="100%"
        align="stretch"
        direction="column"
        background="white"
        zIndex={1}
        overflowY="auto"
        maxH="30vh"
        position="absolute"
        boxShadow="0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)"
      >
        <Heading
          size="xl"
          color="black"
          justify="center"
          align="center"
          fontFamily="Andale Mono"
        >
          Tracker
        </Heading>
        <Flex direction="column" p={2}>
          <Text as="b">Campground: {campground}</Text>
          <Text as="b">Checkin: {checkin}</Text>
          <Text as="b">Checkout: {checkout}</Text>
          <Text as="b">Group Size: {groupSize}</Text>
          <Text as="b">Type: {type}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

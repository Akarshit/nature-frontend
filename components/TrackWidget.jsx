import { Flex, Button, Input } from '@chakra-ui/react';
import { useUIStore } from 'brain/store.js';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import Suggest from './Suggest';

export default function TrackWidget() {
  const searchInput = useUIStore((state) => state.searchInput);
  const setSearchInput = useUIStore((state) => state.setSearchInput);
  const getSuggestedResults = useUIStore((state) => state.getSuggestedResults);
  const debouncedGetSuggestedResults = useCallback(
    debounce(getSuggestedResults, 150),
    []
  );
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
          <Flex direction="column" align="stretch" flexShrink={2} mx={3} my={2}>
            <Input placeholder="Search" size="md" />
            <Suggest />
          </Flex>

          <Input
            placeholder="Search"
            size="md"
            mx={3}
            my={2}
            flexShrink={2}
            onChange={(e) => {
              setSearchInput(e.target.value);
              debouncedGetSuggestedResults(e.target.value);
            }}
            value={searchInput}
          />
          <Input
            placeholder="Checkin"
            size="md"
            type="date"
            mx={3}
            my={2}
            flexShrink={8}
          />
          <Input
            placeholder="Checkout"
            size="md"
            type="date"
            mx={3}
            my={2}
            flexShrink={8}
          />
          <Button
            colorScheme="teal"
            size="md"
            width="75%"
            mx={3}
            my={2}
            flexShrink={8}
          >
            Track
          </Button>
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
}

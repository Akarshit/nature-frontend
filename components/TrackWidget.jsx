import { Flex, Button, Input } from '@chakra-ui/react';
import { useUIStore } from 'brain/store.js';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import Suggest from './Suggest';

export default function TrackWidget() {
  const searchInput = useUIStore((state) => state.searchInput);
  const setSearchInput = useUIStore((state) => state.setSearchInput);
  const getSuggestedResults = useUIStore((state) => state.getSuggestedResults);
  const setStartDate = useUIStore((state) => state.setStartDate);
  const setEndDate = useUIStore((state) => state.setEndDate);
  const createTracker = useUIStore((state) => state.createTracker);
  const debouncedGetSuggestedResults = useCallback(
    debounce(getSuggestedResults, 500),
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
            <Input
              placeholder="Search"
              size="md"
              //mx={3}
              //my={2}
              flexShrink={2}
              onChange={(e) => {
                console.log('I was fired');
                setSearchInput(e.target.value);
                debouncedGetSuggestedResults(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              value={searchInput}
            />
            <Suggest />
          </Flex>

          <Input
            placeholder="Checkin"
            size="md"
            type="date"
            mx={3}
            my={2}
            flexShrink={8}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
          <Input
            placeholder="Checkout"
            size="md"
            type="date"
            mx={3}
            my={2}
            flexShrink={8}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
          <Button
            colorScheme="teal"
            size="md"
            width="75%"
            mx={3}
            my={2}
            flexShrink={8}
            onClick={createTracker}
          >
            Track
          </Button>
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
}

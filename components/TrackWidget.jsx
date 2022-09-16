import { Button, Flex, Icon, Input, Select } from '@chakra-ui/react';
import { MdArrowDropDown, MdPeople } from 'react-icons/md';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { DateRange } from 'components';
import { ENTITY_TYPES } from 'brain/constants';
import Suggest from './Suggest';
import { debounce } from 'lodash';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

export default function TrackWidget() {
  const router = useRouter();
  const { groupSize, equipmentType, startDate, endDate } = useUIStore(
    (state) => state.trackerInput,
    shallow
  );
  const searchInput = useUIStore((state) => state.searchInput);
  const setSearchInput = useUIStore((state) => state.setSearchInput);
  const getSuggestedResults = useUIStore((state) => state.getSuggestedResults);
  const setStartDate = useUIStore((state) => state.setStartDate);
  const setEndDate = useUIStore((state) => state.setEndDate);
  const setShowSuggestions = useUIStore((state) => state.setShowSuggestions);
  const setEquipmentType = useUIStore((state) => state.setEquipmentType);
  const setGroupSize = useUIStore((state) => state.setGroupSize);
  const toggleContactModal = useUIStore((state) => state.toggleContactModal);
  const user = useUIStore((state) => state.user);

  const handleClick = () => {
    if (user?.contacts?.[0]?.verified) {
      router.push('/checkout');
    } else {
      toggleContactModal('register');
    }
  };

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
      backgroundColor="white"
    >
      <Flex align="stretch" direction="column">
        <Flex direction="row" justify="left" align="stretch" maxH="50%" ml={5}>
          <Flex direction="row" m={2} justify="space-around" align="center">
            <Icon as={MdPeople} color="green.500" boxSize={7} mr={1} />
            <NumberInput
              size="sm"
              maxW={16}
              defaultValue={1}
              min={1}
              onChange={setGroupSize}
              value={groupSize}
              max={50}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Flex p={2} maxW="30vh">
            <Select
              icon={<MdArrowDropDown />}
              placeholder="Select Type"
              size="xs"
              value={equipmentType}
              onChange={(e) => {
                setEquipmentType(e.target.value);
              }}
            >
              {ENTITY_TYPES.map((entity) => (
                <option key={entity} value={entity}>
                  {entity}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>

        <Flex direction="row" justify="space-around" w="75vw">
          <Flex direction="column" align="stretch" w="50%" mx={3} my={2}>
            <Input
              placeholder="Search"
              size="md"
              flexShrink={2}
              onChange={(e) => {
                setSearchInput(e.target.value);
                debouncedGetSuggestedResults(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setShowSuggestions(false);
              }}
              value={searchInput}
              textColor="blackAlpha.900"
              fontFamily="Roboto, Arial, sans-serif"
            />
            <Suggest />
          </Flex>
          <DateRange />

          {/* <Input
            placeholder="Checkin"
            size="md"
            type="date"
            mx={3}
            my={2}
            flexShrink={8}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            textColor="blackAlpha.900"
            fontFamily="Roboto, Arial, sans-serif"
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
            textColor="blackAlpha.900"
            fontFamily="Roboto, Arial, sans-serif"
          /> */}
          <Button
            colorScheme="green"
            size="md"
            width="75%"
            mx={3}
            my={2}
            flexShrink={8}
            onClick={handleClick}
            textColor="white"
            fontFamily="Roboto, Arial, sans-serif"
          >
            Track
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

import {
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from '@chakra-ui/react';
import { MdArrowDropDown, MdPeople } from 'react-icons/md';
import { useCallback, useState } from 'react';

import { DateRangePicker } from 'components';
import { ENTITY_TYPES } from 'brain/constants';
import Suggest from './Suggest';
import { WarningIcon } from '@chakra-ui/icons';
import { debounce } from 'lodash';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

export default function TrackWidget() {
  const router = useRouter();
  const { groupSize, equipmentType, outingId, startDate, endDate } = useUIStore(
    (state) => state.trackerInput,
    shallow
  );
  const {
    searchInput,
    setSearchInput,
    getSuggestedResults,
    setShowSuggestions,
    setEquipmentType,
    setGroupSize,
    toggleContactModal,
    user,
    sub,
    setShowPricingModal,
    trackErrors,
    setTrackErrors,
  } = useUIStore((state) => state, shallow);

  const validate = () => {
    const errors = {};
    errors.equipmentType = equipmentType
      ? null
      : 'Equipment type should be selected';
    errors.searchInput = outingId ? null : 'Please select a campground';
    if (!startDate || !endDate) {
      errors.date = 'Select a checkin date';
    } else if (startDate == endDate) {
      errors.date = 'Checkout should be atleast a day after checkin';
    } else if (startDate < new Date()) {
      errors.date = 'Checkin date must be in the future';
    } else {
      errors.date = null;
    }
    setTrackErrors({ ...trackErrors, ...errors });
    if (Object.values(errors).find((e) => !!e)) {
      return false;
    } else {
      return true;
    }
  };

  const handleClick = () => {
    const isValid = validate();
    if (!isValid) return;
    if (user?.contacts?.[0]?.verified) {
      if (!sub?._id) {
        // The user doesn't has a subscription
        setShowPricingModal(true);
      } else {
        router.push('/checkout');
      }
    } else {
      toggleContactModal('register');
    }
  };

  const debouncedGetSuggestedResults = useCallback(
    debounce(getSuggestedResults, 500),
    []
  );
  const error = Object.values(trackErrors).find((e) => !!e);
  return (
    <Flex
      align="stretch"
      direction="column"
      boxShadow="dark-lg"
      borderRadius="8px"
      p={2}
      w={['90%', 'unset']}
      backgroundColor="white"
    >
      <Flex align={['center', 'stretch']} direction="column">
        <Flex
          direction="row"
          justify={['center', 'space-between']}
          align="stretch"
          maxH="50%"
          w="100%"
        >
          <Flex ml={5}>
            <Flex direction="row" m={2} justify="space-between" align="center">
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
              <FormControl isInvalid={trackErrors.equipmentType}>
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
              </FormControl>
            </Flex>
          </Flex>
          <Flex
            justify={'center'}
            align="center"
            transition="visibility 0.15s ease-out"
            visibility={error ? 'visible' : 'hidden'}
            mr={5}
            display={['none', 'flex']}
          >
            <WarningIcon mr={2} color="red.600" />
            <Text color="red.500">{error}</Text>
          </Flex>
        </Flex>

        <Flex
          direction="row"
          justify="space-around"
          w={['100%', '75vw']}
          flexFlow={['wrap', 'nowrap']}
        >
          <Flex
            direction="column"
            align="stretch"
            w={['100%', '50%']}
            mx={3}
            my={2}
          >
            <FormControl isInvalid={trackErrors.searchInput}>
              <Input
                placeholder="Search Campgrounds"
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
            </FormControl>
            <Suggest />
          </Flex>
          <DateRangePicker />
          <Button
            colorScheme="green"
            size="md"
            width={['60%', '25%']}
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

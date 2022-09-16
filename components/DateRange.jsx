import { Button, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';
import { MdArrowDropDown, MdPeople } from 'react-icons/md';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { CalendarIcon } from '@chakra-ui/icons';
import DateRangePicker from 'react-daterange-picker';
import { ENTITY_TYPES } from 'brain/constants';
import Suggest from './Suggest';
import { debounce } from 'lodash';
import moment from 'moment';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

export default function DateRange() {
  const { groupSize, equipmentType, startDate, endDate } = useUIStore(
    (state) => state.trackerInput,
    shallow
  );
  const { setStartDate, setEndDate } = useUIStore((state) => state, shallow);
  const [showCal, setShowCal] = useState(false);
  const [dates, setDatesInternal] = useState({
    start: startDate,
    end: endDate,
  });
  const setDates = (dates) => {
    setDatesInternal(dates);
    setStartDate(dates.start.utc().startOf('day'));
    setEndDate(dates.end.utc().startOf('day'));
  };
  const onSelectStart = (val) => {
    console.log(val);
    // Got the start date
    setStartDate(val.utc().startOf('day'));
  };
  const handleStartClick = () => {
    setShowCal(true);
  };
  const handleEndClick = () => {
    setShowCal(false);
  };
  return (
    <Flex align={'flex-start'} direction="column">
      <Flex>
        <Text
          mx={3}
          my={2}
          color="blackAlpha.900"
          fontFamily="Roboto, Arial, sans-serif"
          borderRadius={8}
          borderWidth={1}
          borderColor="blackAlpha.200"
          w="150px"
          p={2}
          display="flex"
          justifyContent={'space-between'}
          alignItems="center"
          cursor={'pointer'}
          onClick={handleStartClick}
        >
          {startDate.format('MMM Do YYYY')}
          <CalendarIcon />
        </Text>
        <Text
          mx={3}
          my={2}
          color="blackAlpha.900"
          fontFamily="Roboto, Arial, sans-serif"
          borderRadius={8}
          borderWidth={1}
          borderColor="blackAlpha.200"
          w="150px"
          p={2}
          display="flex"
          justifyContent={'space-between'}
          alignItems="center"
          cursor={'pointer'}
          onClick={handleEndClick}
        >
          {endDate.format('MMM Do YYYY')}
          <CalendarIcon />
        </Text>
      </Flex>
      <Flex position={'relative'}>
        <Flex
          display={showCal ? 'flex' : 'none'}
          position="absolute"
          bgColor={'white'}
          left={4}
        >
          <DateRangePicker
            onSelect={setDates}
            value={dates}
            numberOfCalendars={1}
            onSelectStart={onSelectStart}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

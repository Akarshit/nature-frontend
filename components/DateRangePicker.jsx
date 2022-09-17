import { ArrowForwardIcon, CalendarIcon } from '@chakra-ui/icons';
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

import { DateRange } from 'react-date-range';
import { ENTITY_TYPES } from 'brain/constants';
import Suggest from './Suggest';
import { debounce } from 'lodash';
import moment from 'moment';
import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

export default function DateRangePicker() {
  const { startDate, endDate } = useUIStore(
    (state) => state.trackerInput,
    shallow
  );
  const { setStartDate, setEndDate } = useUIStore((state) => state, shallow);
  const [showCal, setShowCal] = useState(false);
  const setDates = (dates) => {
    console.log(dates);
    const sD = dates.selection.startDate;
    const eD = dates.selection.endDate;
    setStartDate(sD);
    setEndDate(eD);
    if (eD != sD) {
      setShowCal(false);
    }
  };
  console.log(showCal);
  const toggleCal = (val) => {
    console.log(val);
    setShowCal(val);
  };
  const dates = {
    startDate,
    endDate,
    key: 'selection',
  };
  return (
    <Flex align={'flex-start'} direction="column" w={['100%', 'unset']}>
      <Flex w={['100%', 'unset']}>
        <Text
          mx={3}
          my={2}
          color="blackAlpha.900"
          fontFamily="Roboto, Arial, sans-serif"
          borderRadius={8}
          borderWidth={1}
          borderColor="blackAlpha.200"
          w={['100%', '350px']}
          p={2}
          display="flex"
          justifyContent={'space-between'}
          alignItems="center"
          cursor={'pointer'}
          outline={showCal ? '-webkit-focus-ring-color auto 1px' : 'none'}
          onClick={() => toggleCal(true)}
        >
          {startDate?.toDateString() ?? 'Checkin Date'}
          <ArrowForwardIcon color="green.500" />
          {endDate?.toDateString() ?? 'Checkout Date'}
          <CalendarIcon
            color={'green.500'}
            onClick={(e) => {
              e.stopPropagation();
              toggleCal(!showCal);
            }}
          />
        </Text>
      </Flex>
      <Flex position={'relative'}>
        <Flex
          display={showCal ? 'flex' : 'none'}
          position="absolute"
          bgColor={'white'}
          left={4}
        >
          <DateRange
            ranges={[dates]}
            onChange={setDates}
            rangeColors={['burlywood']}
            showDateDisplay={false}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

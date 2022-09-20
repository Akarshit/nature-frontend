import { Flex, IconButton, Image, Text } from '@chakra-ui/react';

import { IoClose } from 'react-icons/io5';
import { IoIosPause } from 'react-icons/io';
import { convertDateToUTC } from 'utils';
import shallow from 'zustand/shallow';
//import { useRouter } from 'next/router';
//import { useState } from 'react';
import { useUIStore } from '#store';

//import { HiPause, HiPlay } from 'react-icons/hi2';

export default function TrackerCard(props) {
  const { trackerId, tracker } = props;
  const { searchInput, outing } = useUIStore((state) => state, shallow);
  const {
    outing: { name },
    startDate,
    endDate,
    groupSize,
    equipmentType,
  } = tracker;
  const trackerDetails = [
    {
      label: 'Campground',
      value: name,
    },
    {
      label: 'Checkin Date',
      value: convertDateToUTC(new Date(tracker.startDate)).toDateString(),
    },
    {
      label: 'Checkout Date',
      value: convertDateToUTC(new Date(endDate)).toDateString(),
    },
    {
      label: 'Group Size',
      value: groupSize,
    },
    {
      label: 'Equipment Type',
      value: equipmentType,
    },
  ];
  return (
    <Flex
      direction={'row'}
      p={4}
      mx={5}
      my={3}
      bgColor="white"
      w={['70%', '70%']}
      borderRadius={10}
      fontFamily="Roboto, Arial, sans-serif"
      boxShadow={'dark-lg'}
    >
      <Image
        objectFit="cover"
        src={outing?.preview_image_url ?? '/camp.jpg'}
        m={2}
        alignSelf={'stretch'}
        maxH="80px"
      />
      <Flex direction="column" p={2} alignSelf="left" w="100%">
        <Text fontWeight={'bold'} mr={3}>
          {trackerDetails[0].label + ':'}
        </Text>
        <Text mr={3}>{trackerDetails[0].value}</Text>
        <Flex direction="row">
          <Text fontWeight={'bold'} mr={3}>
            {trackerDetails[1].label + ':'}
          </Text>
          <Text mr={3}>{trackerDetails[1].value}</Text>
          <Text fontWeight={'bold'} mr={3}>
            {trackerDetails[2].label + ':'}
          </Text>
          <Text mr={3}>{trackerDetails[2].value}</Text>
        </Flex>
        <Flex direction="row">
          <Text fontWeight={'bold'} mr={3}>
            {trackerDetails[3].label + ':'}
          </Text>
          <Text mr={3}>{trackerDetails[3].value}</Text>
          <Text fontWeight={'bold'} mr={3}>
            {trackerDetails[4].label + ':'}
          </Text>
          <Text mr={3}>{trackerDetails[4].value}</Text>
        </Flex>
      </Flex>
      <Flex justify={'center'} align={'center'} my={2}>
        <IconButton
          variant="outline"
          colorScheme="green"
          aria-label="Pause"
          fontSize="20px"
          icon={<IoIosPause />}
          mx={2}
          borderRadius={20}
        />
        <IconButton
          variant="outline"
          colorScheme="red"
          aria-label="Cancel"
          fontSize="20px"
          icon={<IoClose />}
          mx={2}
          borderRadius={20}
        />
      </Flex>
    </Flex>
  );
}

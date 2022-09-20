import { Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { IoIosPause, IoIosPlay } from 'react-icons/io';

import { IoClose } from 'react-icons/io5';
import { convertDateToUTC } from 'utils';
import shallow from 'zustand/shallow';
//import { useRouter } from 'next/router';
//import { useState } from 'react';
import { useUIStore } from '#store';

export default function TrackerCard(props) {
  const { updateTrackerStatus } = useUIStore((state) => state);
  const { tracker } = props;
  const { outing, startDate, endDate, groupSize, equipmentType, status } =
    tracker;
  const { name } = outing;
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
          icon={status === 'active' ? <IoIosPause /> : <IoIosPlay />}
          mx={2}
          borderRadius={20}
          onClick={() =>
            updateTrackerStatus({
              _id: tracker._id,
              status: status === 'active' ? 'paused' : 'active',
            })
          }
        />
        <IconButton
          variant="outline"
          colorScheme="red"
          aria-label="Cancel"
          fontSize="20px"
          icon={<IoClose />}
          mx={2}
          borderRadius={20}
          onClick={() =>
            updateTrackerStatus({ _id: tracker._id, status: 'deleted' })
          }
        />
      </Flex>
    </Flex>
  );
}

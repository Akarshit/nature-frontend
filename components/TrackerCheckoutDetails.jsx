import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { Loading } from 'components';
import { convertDateToUTC } from 'utils';
import shallow from 'zustand/shallow';
import { useState } from 'react';
import { useUIStore } from '#store';

export default function TrackerCheckoutDetails() {
  const {
    groupSize,
    equipmentType,
    startDate: checkin,
    endDate: checkout,
  } = useUIStore((state) => state.trackerInput, shallow);
  const { searchInput, outing, planSlug, setPlanSlug, sub } = useUIStore(
    (state) => state,
    shallow
  );
  const noPayment = !!sub?._id;
  const trackerDetails = [
    {
      label: 'Campground',
      value: searchInput,
    },
    {
      label: 'Checkin Date',
      value: convertDateToUTC(new Date(checkin)).toDateString(),
    },
    {
      label: 'Checkout Date',
      value: convertDateToUTC(new Date(checkout)).toDateString(),
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
    <Flex w="100%" direction="column" my={3} align={'center'}>
      {!noPayment && (
        <Flex direction="row" my={3}>
          <Flex
            direction="column"
            w="55%"
            p={2}
            mx={5}
            bgColor="white"
            color="black"
            borderRadius={10}
            outline={planSlug === 'pay-as-you-go' ? '5px solid green' : ''}
            boxShadow="dark-lg"
            onClick={() => setPlanSlug('pay-as-you-go')}
            cursor="pointer"
          >
            <Heading size="lg" align="center" py={1} mb={2}>
              Pay As You Go
            </Heading>
            <Flex
              fontSize={['1.2em', '2em']}
              justifyContent="center"
              p={[0, 5]}
              alignItems={'baseline'}
            >
              $<Text fontSize="2em">10</Text>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            w="50%"
            p={2}
            mx={5}
            bgColor="white"
            color="black"
            borderRadius={10}
            position="relative"
            boxShadow="dark-lg"
            outline={planSlug === 'basic-monthly' ? '5px solid green' : ''}
            onClick={() => setPlanSlug('basic-monthly')}
            cursor="pointer"
          >
            <div class="ribbon">
              <span>Save 33%</span>
            </div>
            <Heading size="lg" align="center" p={1} mb={2}>
              Subscribe
            </Heading>
            <Flex justify="space-around">
              <Flex
                fontSize={['1.2em', '2em']}
                justifyContent="center"
                p={[0, 5]}
                alignItems={'baseline'}
              >
                $
                <Text fontSize="2em" mr={1}>
                  15
                </Text>
                /mth
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
      <Flex
        direction={'column'}
        p={4}
        mx={[0, 3]}
        my={3}
        bgColor="white"
        w={['90%', '70%']}
        borderRadius={10}
        fontFamily="Roboto, Arial, sans-serif"
        boxShadow={'dark-lg'}
      >
        <Text fontSize="2xl">Tracking Details:</Text>
        <Image
          objectFit="cover"
          src={outing?.preview_image_url ?? 'camp.jpg'}
          m={2}
          alignSelf={'stretch'}
          maxH="180px"
        />
        <Flex direction="column" p={2} alignSelf="left">
          {trackerDetails.map((obj) => (
            <Flex key={obj.label} my={0.5}>
              <Text fontWeight={'bold'} mr={3}>
                {obj.label}:
              </Text>
              <Text>{obj.value}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

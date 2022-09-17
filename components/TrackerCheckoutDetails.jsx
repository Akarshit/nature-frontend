import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { convertDateToUTC } from 'utils';
import { useUIStore } from '#store';

export default function TrackerCheckoutDetails() {
  const groupSize = useUIStore((state) => state.trackerInput.groupSize);
  const equipmentType = useUIStore((state) => state.trackerInput.equipmentType);
  const campground = useUIStore((state) => state.searchInput);
  const checkin = useUIStore((state) => state.trackerInput.startDate);
  const checkout = useUIStore((state) => state.trackerInput.endDate);
  const initializePayment = useUIStore((state) => state.initializePayment);
  const outing = useUIStore((state) => state.outing);
  console.log('outing', outing);
  const trackerDetails = [
    {
      label: 'Campground',
      value: campground,
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
      <Flex direction="row" my={3}>
        <Flex
          direction="column"
          w="55%"
          p={2}
          mx={5}
          bgColor="white"
          color="black"
          borderRadius={10}
          outline="5px solid green"
          boxShadow="dark-lg"
        >
          <Heading size="lg" align="center" py={1} mb={2}>
            Pay As You Go
          </Heading>
          <Text
            fontSize="2em"
            justifyContent="center"
            p={5}
            display="flex"
            alignItems={'baseline'}
          >
            $<Text fontSize="2em">10</Text>
          </Text>
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
        >
          <div class="ribbon">
            <span>Save 33%</span>
          </div>
          <Heading size="lg" align="center" p={1} mb={2}>
            Subscribe
          </Heading>
          <Flex justify="space-around">
            <Text
              fontSize="2em"
              justifyContent="center"
              p={5}
              display="flex"
              alignItems={'baseline'}
            >
              $
              <Text fontSize="2em" mr={1}>
                15
              </Text>
              /mth
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction={'column'}
        p={4}
        m={3}
        bgColor="white"
        w="70%"
        borderRadius={10}
        fontFamily="Roboto, Arial, sans-serif"
        boxShadow={'dark-lg'}
      >
        <Text fontSize="2xl">Tracking Details:</Text>
        <Image
          objectFit="cover"
          src={outing?.preview_image_url ?? 'camp.jpg'}
          p={4}
          m={1}
          h="28%"
          alignSelf={'stretch'}
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
        <Flex w="100%" justify={'center'} mt={2}>
          <Button
            id="card-button"
            type="button"
            colorScheme={'green'}
            onClick={initializePayment}
            w="50%"
          >
            Pay $1.00
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

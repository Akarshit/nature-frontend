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
      label: 'Campground Name',
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
    <Flex w="100%" direction="column">
      <Image
        objectFit="cover"
        src={outing?.preview_image_url ?? 'hero.jpg'}
        align="stretch"
        maxH="30%"
        mb={10}
      />
      <Flex direction={'column'} px={8} ali>
        <Text fontSize="3xl">Tracking Details:</Text>
        <Flex direction="column" p={2} px={10}>
          {trackerDetails.map((obj) => (
            <Flex key={obj.label} my={0.5}>
              <Text fontWeight={'bold'} mr={3}>
                {obj.label}:
              </Text>
              <Text>{obj.value}</Text>
            </Flex>
          ))}
        </Flex>
        <Flex w="100%" justify={'center'} mt={16}>
          <Button
            id="card-button"
            type="button"
            colorScheme={'teal'}
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

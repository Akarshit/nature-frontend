import { Badge, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { IoIosPause, IoIosPlay } from 'react-icons/io';

import { IoClose } from 'react-icons/io5';
import { convertDateToUTC } from 'utils';
import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

export default function GcCard(props) {
  const { gc } = props;
  const {
    gan,
    status,
    cost: { amount, currency },
  } = gc;
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
      align="flex-start"
    >
      <Flex direction="column" p={2} alignSelf="left" w="100%">
        <Flex direction={'row'}>
          <Text fontWeight={'bold'} mr={3}>
            Card Number
          </Text>
          <Text mr={3}>{gan}</Text>
        </Flex>
        <Flex direction={'row'}>
          <Text fontWeight={'bold'} mr={3}>
            Amount:
          </Text>
          <Text mr={3}>{amount}</Text>
        </Flex>
      </Flex>
      <Badge colorScheme="green" variant="outline" fontSize="0.8em">
        {status}
      </Badge>
    </Flex>
  );
}

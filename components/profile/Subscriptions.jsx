import { Badge, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { GcCard, NavBar, ProfileNav } from 'components';
import { IoIosPause, IoIosPlay } from 'react-icons/io';
import { useEffect, useState } from 'react';

import { IoClose } from 'react-icons/io5';
import { orderBy } from 'lodash';
import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

function SubCard({ sub }) {
  const updateSubStatus = useUIStore((state) => state.updateSubStatus, shallow);
  const { plan } = sub;
  const { lastPaymentDate, status } = sub;
  const {
    name,
    cost: { amount, currency },
    cadence,
  } = plan;
  const canResume =
    ['paused', 'pause-requested', 'cancelled', 'cancel-requested'].indexOf(
      status
    ) > -1;
  const canPause = ['active', 'resume-requested'].indexOf(status) > -1;
  return (
    <Flex
      justify="space-between"
      p={5}
      bgColor="white"
      shadow={'md'}
      borderWidth="1px"
      borderRadius={5}
      minW="70%"
    >
      <Flex direction="column">
        <Flex direction={'row'} align="flex-start" justify={'space-between'}>
          <Flex>
            <Text fontWeight={600} mr={3} fontSize="3xl" color="blackAlpha.700">
              Plan:
            </Text>
            <Text fontWeight={500} mr={3} fontSize="3xl">
              {name}
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'row'}>
          <Text fontWeight={600} mr={3} fontSize="xl" color="blackAlpha.700">
            Price:
          </Text>
          <Text fontWeight={500} mr={3} fontSize="xl">
            {amount}$ {cadence.toLowerCase()}
          </Text>
        </Flex>
        <Flex direction={'row'}>
          <Text fontWeight={600} mr={3} fontSize="xl" color="blackAlpha.700">
            Last Payment Date:
          </Text>
          <Text fontWeight={500} mr={3} fontSize="xl">
            {new Date(lastPaymentDate).toDateString()}
          </Text>
        </Flex>
      </Flex>
      <Flex direction={'column'} align="flex-end">
        <Badge
          colorScheme="green"
          variant="outline"
          fontSize="0.8em"
          w="max-content"
          mb={2}
        >
          {status.toUpperCase()}
        </Badge>
        <Flex justify={'center'} align={'center'} my={2}>
          <IconButton
            variant="outline"
            colorScheme="green"
            aria-label="Pause"
            fontSize="20px"
            icon={canResume ? <IoIosPlay /> : <IoIosPause />}
            mx={2}
            borderRadius={20}
            onClick={() =>
              updateSubStatus({
                status: canResume ? 'resume' : 'pause',
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
            onClick={() => updateSubStatus({ status: 'cancelled' })}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
export default function Subscriptions() {
  const subs = useUIStore((state) => state.subs, shallow);
  return (
    <Flex direction={'column'} align="center">
      <Heading
        size="lg"
        align="center"
        p={1}
        m={5}
        fontFamily="Roboto, Arial, sans-serif"
      >
        Your Subscription
      </Heading>
      {subs.map((sub) => (
        <SubCard key={sub._id} sub={sub} />
      ))}
    </Flex>
  );
}

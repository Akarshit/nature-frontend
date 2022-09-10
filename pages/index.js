import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useUIStore } from '../brain/store.js';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';

export default function Home() {
  const bears = useUIStore((state) => state.bears);
  const increasePopulation = useUIStore((state) => state.increasePopulation);
  return (
    <Flex align="center" justify="center" direction="column">
      <Heading m={10}>Reserve Nature</Heading>
      <Heading m={10}>{bears}</Heading>
      <Button colorScheme="blue" onClick={increasePopulation}>
        Add Bear
      </Button>
    </Flex>
  );
}

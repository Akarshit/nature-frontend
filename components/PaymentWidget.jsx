import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { Loading } from 'components';
import { useUIStore } from '#store';

export default function PaymentWidget({ setCard }) {
  const appId = 'sandbox-sq0idb-JI8iCLc7yxh2rhwxyB5iuw';
  // const setCard = useUIStore((state) => state.setCard);
  const cardBox = useRef();
  const locationId = 'L315D6EGPC8K1';
  const [loading, setLoading] = useState(true);

  async function initializeCard(payments) {
    const cardEl = await payments.card();
    if (!cardBox.current?.getInnerHTML()) {
      await cardEl.attach('#card-container');
    }
    return cardEl;
  }

  const attachCard = async () => {
    const payments = window.Square.payments(appId, locationId);
    let cardEl;
    try {
      cardEl = await initializeCard(payments);
      setCard(cardEl);
      setLoading(false);
    } catch (e) {
      console.error('Initializing Card failed', e);
      return;
    }
  };

  useEffect(() => {
    if (window && document) {
      const script = document.createElement('script');

      script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
      script.type = 'text/javascript';
      script.async = true;
      script.addEventListener('load', () => {
        // Attach card
        attachCard();
      });

      const script2 = document.createElement('script');

      document.body.appendChild(script);
      document.body.appendChild(script2);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <Flex direction={'column'}>
      <Text fontSize={'2xl'} fontWeight={400} my={3} fontFamily="sans-serif">
        Enter Card Details:
      </Text>
      <Flex direction="column" mt={3} pos="relative" minH={'100px'}>
        <Loading mode={'control'} loading={loading} />
        <Flex id="card-container" ref={cardBox}></Flex>
      </Flex>
    </Flex>
  );
}

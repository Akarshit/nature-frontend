import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { Loading } from 'components';
import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

export default function PaymentWidget({ setCard }) {
  const cardBox = useRef();
  const { setPayments } = useUIStore((state) => state, shallow);
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const locationId = process.env.NEXT_PUBLIC_LOCATION_ID;
  const [loading, setLoading] = useState(true);

  async function initializeCard(payments) {
    const cardEl = await payments.card();
    setPayments(payments);
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

      script.src = process.env.NEXT_PUBLIC_SQUARE_SCRIPT_URL;
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

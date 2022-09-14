import { useEffect, useRef, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import SuggestArea from './SuggestArea';
import { useUIStore } from '#store';

export default function PaymentWidget() {
  const initializePayment = useUIStore((state) => state.initializePayment);
  const appId = 'sandbox-sq0idb-JI8iCLc7yxh2rhwxyB5iuw';
  const locationId = 'L315D6EGPC8K1';
  const cardBox = useRef(null);
  const [card, setCard] = useState(null);

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
    <Flex w="100%" position="relative">
      <Flex
        w="100%"
        align="stretch"
        direction="column"
        background="white"
        zIndex={1}
        overflowY="auto"
        maxH="30vh"
        position="absolute"
        boxShadow="0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)"
      >
        <form id="payment-form">
          <div id="card-container" ref={cardBox}></div>
          <button
            id="card-button"
            type="button"
            onClick={() => initializePayment(card)}
          >
            Pay $1.00
          </button>
        </form>
        <div id="payment-status-container"></div>
      </Flex>
    </Flex>
  );
}

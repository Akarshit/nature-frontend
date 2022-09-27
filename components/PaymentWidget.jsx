import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { Loading } from 'components';
import shallow from 'zustand/shallow';
import { useUIStore } from '#store';

const NavButton = ({ children, onClick, isActive }) => {
  return (
    <Flex>
      <Button
        borderBottomRadius={0}
        mr="1px"
        colorScheme={'green'}
        onClick={onClick}
        isActive={isActive}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default function PaymentWidget() {
  const cardBox = useRef();
  const { setPayments, setCard, paymentMode, setPaymentMode } = useUIStore(
    (state) => state,
    shallow
  );
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const locationId = process.env.NEXT_PUBLIC_LOCATION_ID;
  const [loading, setLoading] = useState(true);

  const elementId =
    paymentMode === 'card' ? 'card-container' : 'gift-card-container';

  const toggleNav = async () => {
    const newPaymentMode = paymentMode === 'card' ? 'gift-card' : 'card';
    setPaymentMode(newPaymentMode);
    await new Promise((resolve) => setTimeout(resolve, 500));
    attachCard({ force: true, paymentMode: newPaymentMode });
  };

  async function initializeCard(payments, options) {
    let cardEl;
    if (options?.paymentMode === 'card') {
      cardEl = await payments.card();
    } else {
      cardEl = await payments.giftCard();
    }
    if (options?.force || !cardBox.current?.getInnerHTML()) {
      cardBox.current.innerHTML = '';
      await cardEl.attach(`#${options.paymentMode}-container`);
    }
    setPayments(payments);
    return cardEl;
  }

  const attachCard = async (options) => {
    const payments = window.Square.payments(appId, locationId);
    try {
      const cardEl = await initializeCard(payments, options);
      cardEl.toJSON = () => ({ hidden: 'to help redux devtools :)' });
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
        attachCard({ paymentMode: 'card' });
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
      <Flex>
        <NavButton onClick={toggleNav} isActive={paymentMode === 'card'}>
          Card
        </NavButton>
        <NavButton onClick={toggleNav} isActive={paymentMode === 'gift-card'}>
          Gift Card
        </NavButton>
      </Flex>
      <Flex
        direction={'column'}
        borderWidth="1px"
        borderColor={'green.500'}
        borderRadius={5}
        mt={'-2px'}
        pl={2}
      >
        <Text fontSize={'2xl'} fontWeight={400} my={3} fontFamily="sans-serif">
          Enter Card Details:
        </Text>
        <Flex direction="column" mt={3} pos="relative" minH={'100px'}>
          <Loading mode={'control'} loading={loading} />
          <Flex id={elementId} ref={cardBox}></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

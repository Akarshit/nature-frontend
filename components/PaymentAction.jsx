import { Button } from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { useUIStore } from '#store';

export default function PaymentButton() {
  const { planSlug, plans, sub, setLoading, updateUser, initializePayment } =
    useUIStore((state) => state, shallow);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    const { success, failure } = await initializePayment();
    if (success) {
      // reload the user
      await updateUser();
      // delete the checkout page from history
      router.push('/profile');
    }
    setLoading(false);
  };

  let buttonText = 'Create Tracker';
  if (!sub?._id) {
    // No subscription
    const paymentAmount = plans?.find((plan) => plan.slug === planSlug)?.cost
      .amount;
    buttonText = `Pay $${paymentAmount}`;
  }

  return (
    <Button
      id="card-button"
      type="button"
      colorScheme={'green'}
      onClick={handlePayment}
      w="50%"
    >
      {buttonText}
    </Button>
  );
}

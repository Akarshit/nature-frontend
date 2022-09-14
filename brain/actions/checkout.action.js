import * as api from '../api.js';

// This function tokenizes a payment method.
// The ‘error’ thrown from this async function denotes a failed tokenization,
// which is due to buyer error (such as an expired card). It is up to the
// developer to handle the error and provide the buyer the chance to fix
// their mistakes.
export const tokenize = async (paymentMethod) => {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === 'OK') {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    throw new Error(errorMessage);
  }
};

export const handlePaymentMethodSubmission = async (set, get, { card }) => {
  // Step 1: Create the tracker
  await get().createTracker();

  await get().createSub({
    sub: {
      status: 'inactive',
      recurrance: 'once',
    },
  });

  try {
    // Step 2: Process payment
    const token = await tokenize(card);
    const paymentResult = await api.createPayment({ token });
    set({ paymentResult }, false, 'handlePaymentMethodSubmission');
  } catch (e) {
    get().setCardError(e.message);
  }

  // Step 3: activate traacker
  await get().activateTracker({
    trackerId: get().createTracker._id,
    subId: paymentResult.subId,
  });
  return;
};

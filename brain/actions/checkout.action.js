import * as api from '../api.js';

// This function tokenizes a payment method.
// The ‘error’ thrown from this async function denotes a failed tokenization,
// which is due to buyer error (such as an expired card). It is up to the
// developer to handle the error and provide the buyer the chance to fix
// their mistakes.
export const tokenize = async (set, get, paymentMethod) => {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === 'OK') {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    get().setCardError(errorMessage);
  }
};

export const handlePaymentMethodSubmission = async (set, get, { card }) => {
  // Step 1: Process payment
  const token = await tokenize(set, get, card);

  if (!token) {
    // Can't proceed further
    return { failure: true };
  }

  const data = {
    token,
    planSlug: get().planSlug,
    address: get().address,
  };

  let apiToUse = api.createPayment;

  // Step 2: Make the API call
  // Check if it's a subscribe or pay once
  if (get().planSlug !== 'pay-as-you-go') {
    apiToUse = api.subscibe;
  }
  const {
    success: { sub },
    failure,
  } = await apiToUse(data);

  // Step 3: Create the tracker
  await get().createTracker({ subId: sub._id });
  return { success: true };
};

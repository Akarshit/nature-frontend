import * as api from '../api.js';

async function verifyBuyer(set, get, { token }) {
  const { address, plans, planSlug, user } = get();
  const currentPlan = plans?.find((plan) => plan.slug === planSlug);
  const { cost, currency } = currentPlan.cost.amount;
  const payments = get().payments;
  const verificationDetails = {
    /* collected from the buyer */
    billingContact: {
      addressLines: [address.line1, address.line2],
      familyName: address.firstName,
      givenName: address.lastName,
      email: user.email,
      country: address.country,
      phone: user.contacts[0].contactId,
      region: address.state,
      city: address.city,
    },
  };

  if (currentPlan.cadence === 'ONCE') {
    verificationDetails.currencyCode = currency;
    verificationDetails.amount = `${cost}`;
    verificationDetails.intent = 'CHARGE';
  } else {
    verificationDetails.intent = 'STORE';
  }

  const verificationResults = await payments.verifyBuyer(
    token,
    verificationDetails
  );
  return verificationResults.token;
}

// This function tokenizes a payment method.
// The ‘error’ thrown from this async function denotes a failed tokenization,
// which is due to buyer error (such as an expired card). It is up to the
// developer to handle the error and provide the buyer the chance to fix
// their mistakes.
export const tokenize = async (set, get, paymentMethod) => {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === 'OK') {
    const verificationToken = await verifyBuyer(set, get, {
      token: tokenResult.token,
    });
    return { token: tokenResult.token, verificationToken };
  } else {
    let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    get().setCardError(errorMessage);
    return {};
  }
};

export const initializePayment = async (set, get, { card }) => {
  if (get().sub?._id) {
    // We already have the subscription. Just create the tracker
    return get().createTracker({ subId: get().sub._id });
  }

  // Step 1: Process payment
  const { token, verificationToken } = await tokenize(set, get, card);

  if (!token) {
    // Can't proceed further
    return { failure: true };
  }

  const data = {
    token,
    planSlug: get().planSlug,
    address: get().address,
    locationId: process.env.NEXT_PUBLIC_LOCATION_ID,
    verificationToken,
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

  if (failure) {
    get().setToast({
      title: 'Payment Failed',
      // description: "We've created your account for you.",
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
    return;
  }

  // Step 3: Create the tracker
  return get().createTracker({ subId: sub._id });
};

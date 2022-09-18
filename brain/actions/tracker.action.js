import * as api from '../api.js';

export const createTracker = async (set, get, { subId }) => {
  const tracker = get().trackerInput;
  const { success, failure } = await api.createTracker({
    tracker: {
      ...tracker,
      subId,
      status: 'active',
    },
  });
  if (failure) {
  }
  console.log(success);
  set({ cartTracker: success.tracker }, false, 'createTracker');
  get().setToast({
    title: 'Tracker added',
    // description: "We've created your account for you.",
    status: 'success',
    duration: 2000,
    isClosable: true,
    position: 'top',
  });
};

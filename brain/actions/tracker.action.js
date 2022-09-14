import * as api from '../api.js';

export const createTracker = async (set, get) => {
  const tracker = get().trackerInput;
  const { success, failure } = await api.createTracker({
    tracker,
  });
  if (failure) {
  }
  console.log(success);
  set({ cartTracker: success.tracker }, false, 'createTracker');
};

export const activateTracker = async (set, get, { trackerId, subId }) => {
  const { success, failure } = await api.updateTracker({
    trackerId,
    subId,
  });
  if (failure) {
  }
  console.log(success);
  const { tracker } = success;
  get().setToast({
    title: 'Tracker added',
    // description: "We've created your account for you.",
    status: 'success',
    duration: 2000,
    isClosable: true,
    position: 'top',
  });
};

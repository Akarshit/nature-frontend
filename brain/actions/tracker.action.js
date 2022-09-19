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
  get().setToast({
    title: 'Tracker added',
    // description: "We've created your account for you.",
    status: 'success',
    duration: 2000,
    isClosable: true,
    position: 'top',
  });
};

export const getTrackers = async (set, get) => {
  const { success, failure } = await api.getTrackers();
  if (failure) {
  }
  console.log(success);
  set({ trackers: success.trackers }, false, 'getTrackers');
};

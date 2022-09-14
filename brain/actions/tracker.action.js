import * as api from '../api.js';

export const createTracker = async (set, get) => {
  const tracker = get().trackerInput;
  const { success, failure } = await api.createTracker({
    tracker,
  });
  if (failure) {
  }
  console.log(success);
  const { data } = success;
  set({ cartTracker: data }, false, 'createTracker');
};

export const activateTracker = async ({ trackerId, subId }, set, get) => {
  const { success, failure } = await api.updateTracker({
    trackerId,
    subId,
  });
  if (failure) {
  }
  console.log(success);
  const { data } = success;
};

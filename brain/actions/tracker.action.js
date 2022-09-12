import * as api from '../api.js';

export const createTracker = async (set, get) => {
  const tracker = get().trackerInput;
  const { success, failure } = await api.createTracker({
    tracker,
  });
  if (failure) {
  }
  console.log(success);
  const { data: outings } = success;
};

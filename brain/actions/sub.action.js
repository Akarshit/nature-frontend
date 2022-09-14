import * as api from '../api.js';

export const createSub = async ({ sub }, set, get) => {
  const planId = get().planId;
  const { success, failure } = await api.createSub({
    sub: {
      ...sub,
      planId,
    },
  });
  if (failure) {
  }
  console.log(success);
  const { data } = success;
  set({ cartTracker: data }, false, 'createTracker');
};

import * as api from '../api.js';

/**
 *
 * Not being used right now
 *
 * @param {*} set
 * @param {*} get
 * @param {*} param2
 */
export const createSub = async (set, get, { sub }) => {
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

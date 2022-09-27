import * as api from '../api.js';

export const updateSubStatus = async (set, get, { status }) => {
  const { success, failure } = await api.updateSubStatus({
    subscription: { status, _id: get().sub._id },
  });
  if (failure) {
  }
  console.log(success);
  // refetch sub data
  get().getSub();
};

export const getSub = async (set, get) => {
  const {
    success: { subs },
  } = await api.getSub();
  const sub = subs.find((s) => api.status === 'active');
  console.log('sub is', sub);
  set({ subs, sub }, false, { type: 'getSub' });
};

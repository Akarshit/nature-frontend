import * as api from '../api.js';

export const getPlans = async (set, get) => {
  const { success, failure } = await api.getPlans();
  if (failure) {
    console.log(failure);
    return;
  }
  set({ plans: success.plans }, false, { type: 'getPlans' });
};

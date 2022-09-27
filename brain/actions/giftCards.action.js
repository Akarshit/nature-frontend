import * as api from '../api.js';

export const getGiftCards = async (set, get) => {
  const { success, failure } = await api.getGiftCards();
  if (failure) {
  }
  console.log(success);
  const { giftCards } = success;
  set({ giftCards }, false, { type: 'getGiftCards' });
};

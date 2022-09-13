import * as api from '../api.js';
import { loginUser } from '#actions/auth';

export const register = async (set, get) => {
  const contact = get().contactInput;
  const { success, failure } = await api.registerContact({
    contact: {
      phone: `+${contact.phone}`,
      type: contact.type,
    },
  });
  if (failure) {
  }
  console.log(success);
  const { user } = success;
  loginUser({ set, user, calle: 'register' });
  set({ contactModal: 'verify' }, false, { type: 'register' });
};

export const verify = async (set, get) => {
  const contact = get().contactInput;
  const { success, failure } = await api.verifyContact({
    contact,
  });
  if (failure) {
  }
  console.log(success);
};

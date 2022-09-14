import * as api from '../api.js';

import { loginUser } from '#actions/auth';

export const register = async (set, get) => {
  const contact = get().contactInput;
  const { success, failure } = await api.registerContact({
    contact: {
      contactId: `+${contact.contactId}`,
      type: contact.type,
    },
  });
  if (failure) {
  }
  console.log(success);
  const { user } = success;
  loginUser({ set, user, calle: 'register' });
  set({ showContactModal: 'verify' }, false, { type: 'register' });
};

export const verify = async (set, get) => {
  const contact = get().contactInput;
  const otp = get().otp;
  const { success, failure } = await api.verifyContact({
    contact: {
      contactId: `+${contact.contactId}`,
      type: contact.type,
    },
    code: otp,
  });
  console.log(success, failure);
  if (failure) {
    set({ contactModalError: 'Invalid OTP' }, false, { type: 'verify' });
    set({ otp: '' }, false, { type: 'verify' });
    return;
  }
  const { user } = success;
  loginUser({ set, user, calle: 'verify' });
  set({ showContactModal: false }, false, { type: 'verify' });
  get().setToast({
    title: 'Contact added',
    // description: "We've created your account for you.",
    status: 'success',
    duration: 2000,
    isClosable: true,
    position: 'top',
  });
};

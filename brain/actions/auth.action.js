import * as api from '../api.js';

import { get, set } from 'lodash';

import TokenService from '#services/token';

export const oAuthLogin = async (set, get, { credential }) => {
  const { success, failure } = await api.oAuthLogin({
    credential,
  });

  if (failure) {
  }
  console.log(success);
  const { token, user, planSlug } = success;
  get().setPlanSlug(planSlug);
  TokenService.setToken(token);
  get().updateUser({ user, calle: 'oAuthLogin' });
};

/**
 * This is the function that is called when we want to load the user into state
 */
export const updateUser = async (set, get, { user, calle }) => {
  let apiUser = user;
  if (!user) {
    // get the user again
    const {
      success: { user: newApiUser },
    } = await api.getUser();
    apiUser = newApiUser;
  }

  TokenService.setUser(apiUser);
  set({ user: apiUser }, false, { type: calle, user });
  await postUpdateUser(set, get);
};

const postUpdateUser = async (set, get) => {
  // We should get these after user's login
  // 1. Get their subscripition
  await get().getSub();
};

export const logoutUser = async (set, get) => {
  TokenService.removeToken();
  TokenService.removeUser();
  set({ user: null }, false, 'logoutUser');
};

import * as api from '../api.js';

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
  loginUser({ set, user, calle: 'oAuthLogin' });
};

/**
 * This is the function that is called when we want to load the user into state
 * @param {*} param0
 */
export const loginUser = ({ set, user, calle }) => {
  TokenService.setUser(user);
  set({ user }, false, { type: calle, user });
};

export const logoutUser = async (set, get) => {
  TokenService.removeToken();
  TokenService.removeUser();
  set({ user: null }, false, 'logoutUser');
};

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

export const loginUser = ({ set, user, calle }) => {
  TokenService.setUser(user);
  set({ user }, false, { type: calle, user });
};

export const logoutUser = async (set, get) => {
  TokenService.removeToken();
  TokenService.removeUser();
  set({ user: null }, false, 'logoutUser');
};

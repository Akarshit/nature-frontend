import * as api from '../api.js';
import TokenService from 'services/token.service';

export const oAuthLogin = async (set, get, { credential }) => {
  const { success, failure } = await api.oAuthLogin({
    credential,
  });
  if (failure) {
  }
  console.log(success);
  const { token, user } = success;
  TokenService.setToken(token);
  set({ user }, false, 'oAuthLogin');
};

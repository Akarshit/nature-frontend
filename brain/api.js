import TokenService from '#services/token';
import axios from 'axios';
import { server } from 'config';

const instance = axios.create({
  baseURL: server,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== '/auth/signin' && err.response) {
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response?.data?.message === 'Incorrect email or refreshToken'
      ) {
        // We should log out the user
        TokenService.removeToken();
        TokenService.removeUser();
      } else if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response?.data?.message !== 'No auth token'
      ) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post('/auth/refresh-token', {
            refreshToken: TokenService.getLocalRefreshToken(),
            email: TokenService.getUser().email,
          });
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export const getSuggestions = async ({ query }) => {
  const resp = await instance.get(`/search?q=${query}`);
  return resp.data;
};

export const createTracker = async ({ tracker }) => {
  const resp = await instance.put(`/trackers`, { tracker });
  return resp.data;
};

export const oAuthLogin = async ({ credential }) => {
  const resp = await instance.post(`/auth/google`, {
    token: credential,
  });
  return resp.data;
};

export const registerContact = async ({ contact }) => {
  const resp = await instance.post(`/contact/register`, contact);
  return resp.data;
};

export const verifyContact = async ({ contact, code }) => {
  const resp = await instance.post(`/contact/verify`, { ...contact, code });
  return resp.data;
};

export const createPayment = async ({ token, planSlug, address }) => {
  const locationId = 'L315D6EGPC8K1';
  const body = {
    payment: {
      locationId,
      sourceId: token,
    },
    planSlug,
    address,
  };
  const resp = await instance.post('/payments/create', body);
  return resp.data;
};

export const subscibe = async ({ token, planSlug, address }) => {
  const locationId = 'L315D6EGPC8K1';
  const body = {
    payment: {
      locationId,
      sourceId: token,
      // sourceId: 'cnon:card-nonce-ok',
    },
    planSlug,
    address,
  };
  const resp = await instance.post('/payments/subscribe', body);
  return resp.data;
};

export const createSub = async ({ sub }) => {
  const resp = await instance.post(`/subscriptions`, { sub });
  return resp.data;
};

export const getTrackers = async () => {
  const resp = await instance.get(`/trackers`);
};

export const getSub = async () => {
  const resp = await instance.get(`/subscriptions`);
  return resp.data;
};

export const getUser = async () => {
  const resp = await instance.get(`/auth`);
  return resp.data;
};

export const getPlans = async () => {
  const resp = await instance.get(`/plans/all`);
  return resp.data;
};

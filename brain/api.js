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
    if (err?.response?.status === 401) {
      console.log(err);
      // we are in auth related issue category
      if (originalConfig.url === '/auth/refresh-token') {
        // refresh-token request has failed
        // We should log out the user
        TokenService.removeToken();
        TokenService.removeUser();
      } else if (originalConfig.url !== '/auth/google') {
        if (err?.response?.data?.failure?.message === 'jwt expired') {
          // The JWT has expired fetch a new token
          originalConfig._retry = true;
          try {
            const rs = await instance.post('/auth/refresh-token', {
              refreshToken: TokenService.getLocalRefreshToken(),
              email: TokenService.getUser().email,
            });
            const { accessToken } = rs.data?.success;
            TokenService.updateLocalAccessToken(accessToken);
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error.response);
          }
        } else if (
          err.response?.data?.failure?.message === 'No auth token' ||
          err.response?.data?.failure?.message ===
            'Incorrect email or refreshToken'
        ) {
          // We should log out the user
          TokenService.removeToken();
          TokenService.removeUser();
        }
      }
      return Promise.reject(err.response);
    }
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

export const createPayment = async ({
  token,
  planSlug,
  address,
  locationId,
  verificationToken,
  paymentMode,
}) => {
  const body = {
    payment: {
      locationId,
      sourceId: token,
      verificationToken,
    },
    planSlug,
    address,
    paymentMode,
  };
  try {
    const resp = await instance.post('/payments/create', body);
    return resp.data;
  } catch (err) {
    return err.response.data;
  }
};

export const subscibe = async ({
  token,
  planSlug,
  address,
  locationId,
  verificationToken,
  paymentMode,
}) => {
  const body = {
    payment: {
      locationId,
      // sourceId: process.env.NEXT_PUBLIC_CARD_NONCE
      //   ? process.env.NEXT_PUBLIC_CARD_NONCE
      //   : token,
      sourceId: token,
      verificationToken,
    },
    planSlug,
    address,
    paymentMode,
  };
  try {
    const resp = await instance.post('/payments/subscribe', body);
    return resp.data;
  } catch (err) {
    return err.response.data;
  }
};

export const createSub = async ({ sub }) => {
  const resp = await instance.post(`/subscriptions`, { sub });
  return resp.data;
};

export const getTrackers = async () => {
  const resp = await instance.get(`/trackers`);
  return resp.data;
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

export const updateTrackerStatus = async ({ tracker }) => {
  const resp = await instance.put(`/trackers/update`, {
    tracker,
  });
  return resp.data;
};

export const getGiftCards = async () => {
  const resp = await instance.get(`/giftcards`);
  return resp.data;
};

export const updateSubStatus = async ({ subscription }) => {
  const resp = await instance.post(`/subscriptions/update`, {
    subscription,
  });
  return resp.data;
};

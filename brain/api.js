import axios from 'axios';
import TokenService from '#services/token';

const instance = axios.create({
  baseURL: 'http://localhost:3030/v1',
  timeout: 1000,
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
      if (err.response.status === 401 && !originalConfig._retry) {
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

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3030/v1',
  timeout: 1000,
});

export const getSuggestions = async ({ query }) => {
  const resp = await instance.get(`/search?q=${query}`);
  return resp.data;
};

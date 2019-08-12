import axios from 'axios';

export const AuthAxios = axios.create({});
export const NormalAxios = axios.create({});

AuthAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const configData = config;
  if (token) {
    // eslint-disable-next-line no-param-reassign
    configData.headers.common.Authorization = `Bearer ${token}`;
  }
  return configData;
});

AuthAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

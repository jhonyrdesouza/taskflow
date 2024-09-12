import axios, { AxiosError } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

const cookies = parseCookies();

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${cookies['@taskflow.token']}`,
  },
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();
  config.headers.Authorization = `Bearer ${cookies['@taskflow.token']}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response ? error.response.status : null;

    if ((status === 401 || status === 403) && !error.request.responseURL.endsWith('login')) {
      destroyCookie(null, '@taskflow.token', { path: '/' });
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  },
);

export default api;

import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://help-app-tcc.herokuapp.com/',
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = process.env.REACT_APP_API_TOKEN;

  console.log("TOKEN", token);

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
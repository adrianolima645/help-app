import axios from 'axios';

const api = axios.create({
  baseURL: 'https://help-app-tcc.herokuapp.com/',
});

export default api;

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5713";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
  if (token) {
    config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
  }
  return config;
});

export default axios;

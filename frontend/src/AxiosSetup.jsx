import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5713";
axios.defaults.withCredentials = true;


export default axios;

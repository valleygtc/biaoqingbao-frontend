import axios from 'axios';

const instance = axios.create({
  timeout: 3000, // 3s
});

export default instance;

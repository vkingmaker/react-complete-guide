import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-king-a2f18.firebaseio.com/'
});

export default instance;

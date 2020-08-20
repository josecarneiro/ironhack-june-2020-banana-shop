import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3020',
  withCredentials: true
});

export const listProducts = () => api.get('/product/list').then(response => response.data);

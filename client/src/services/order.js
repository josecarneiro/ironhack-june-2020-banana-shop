import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3020',
  withCredentials: true
});

export const createOrder = body => api.post('/order', body).then(response => response.data);

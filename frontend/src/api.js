import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const register = (data) => API.post('/users/register', data);
export const login = (data) => API.post('/users/login', data);
export const addTransaction = (data) => API.post('/transactions', data);
export const getTransactions = (userId) => API.get(`/transactions/user/${userId}`);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

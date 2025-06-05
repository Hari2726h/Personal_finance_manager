import axios from 'axios';
axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// Add token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Endpoints
export const registerUser = (userData) => API.post('/users/register', userData);
export const loginUser = (userData) => API.post('/users/login', userData);
export const getProfile = () => API.get('/users/profile');
export const getAllUsers = () => API.get('/users');

// Transaction Endpoints
export const addTransaction = (data) => API.post('/transactions', data);
export const getTransactions = (userId) => API.get(`/transactions/user/${userId}`);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// Wallet Endpoints
export const logWalletCash = (data) => API.post('/wallet/log', data);
export const getWalletLogs = (userId) => API.get(`/wallet/user/${userId}`);

// Category Endpoints
export const getCategories = () => API.get('/categories');
export const getCategoryById = (id) => API.get(`/categories/${id}`);
export const addCategory = (data) => API.post('/categories', data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

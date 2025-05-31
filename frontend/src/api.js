import axios from 'axios';

// Base URL setup
const API = axios.create({ baseURL: 'http://localhost:8080/api' });

// === USER AUTH ===
export const register = (data) => API.post('/users/register', data);
export const login = (data) => API.post('/users/login', data);
export const getAllUsers = () => API.get('/users');

// === TRANSACTIONS ===
export const addTransaction = (data) => API.post('/transactions', data);
export const getTransactions = (userId) => API.get(`/transactions/user/${userId}`);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// === WALLET CASH LOGGING ===
export const logWalletCash = (data) => API.post('/wallet/log', data);
export const getWalletLogs = (userId) => API.get(`/wallet/user/${userId}`);

// === CATEGORIES ===
export const getCategories = () => API.get('/categories');
export const getCategoryById = (id) => API.get(`/categories/${id}`);
export const addCategory = (data) => API.post('/categories', data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

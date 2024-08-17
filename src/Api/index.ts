import axios from 'axios';
import { setCredentials, clearCredentials } from './../features/auth/authSlice';
import { API_URL } from '../_env';
import { Store } from '@reduxjs/toolkit';

const api = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  withCredentials: false, // Include cookies with requests if needed
});

const setupInterceptors = (store: Store) => {
api.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Access the current state directly from the store
    const token = state.auth.token; // Get the token from the state

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        store.dispatch(clearCredentials()); // Dispatch the action to clear credentials
      }
    }
);
};
export { api, setupInterceptors };
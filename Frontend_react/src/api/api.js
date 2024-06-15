import axios from 'axios';
import API_KEY from './config';

const API_BASE_URL = `https://neighborhood-app-back.onrender.com/api/v1`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const fetchData = () => {
  return fetch(`https://neighborhood-app-back.onrender.com/registrations`, {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => response.json());
};

export const signIn = async (userData) => {
  try {
    const response = await api.post('/users/sign_in', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (userData) => {
  try {
    const response = await api.post('/users', { user: userData });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postHelpRequest = (helpRequestData) => {
  return api.post('/help_requests', helpRequestData);
};

export default api;

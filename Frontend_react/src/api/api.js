
import axios from 'axios';
import API_KEY from './config';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});


// Utiliser les chemins relatifs pour les endpoints spécifiques
export const signIn = async (userData) => {
  try {
    // Utiliser le chemin complet tel que configuré par Devise et votre routing dans Rails
    const response = await api.post('/users/sign_in', userData);  // Assurez-vous que cette route est correcte
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (userData) => {
  try {
    // Assurez-vous que '/users' est correct et disponible via POST pour l'enregistrement
    const response = await api.post('/users', { user: userData }); // Encapsuler userData dans { user: ... } si nécessaire par votre API Rails
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postHelpRequest = (helpRequestData) => {
  return api.post('/help_requests', helpRequestData);
};


export default api;

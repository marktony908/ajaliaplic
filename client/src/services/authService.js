import axios from './axiosConfig';

export const login = async (email, password) => {
  const response = await axios.post('/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post('/register', userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post('/logout');
  return response.data;
};

export const checkSession = async () => {
  const response = await axios.get('/check_session');
  return response.data;
};
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Backend URL'nizi kontrol edin

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};



const authService = {
  register,
  login,
  logout
};

export default authService;
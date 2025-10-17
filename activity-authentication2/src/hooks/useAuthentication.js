import axios from 'axios';

axios.defaults.withCredentials = true;

export function UseAuthentication() {
  async function login(username, password) {
    if (!username || !password) {
      throw new Error('Username at password ay required');
    }
    
    const response = await axios.post('http://localhost:3000/login', {
      username,
      password
    });
    
    return response.data;
  }

  async function logout() {
    const response = await axios.post('http://localhost:3000/logout');
    return response.data;
  }

  async function checkAuthStatus() {
    const response = await axios.get('http://localhost:3000/auth/status');
    return response.data;
  }

  return {
    login,
    logout,
    checkAuthStatus,
  };
}
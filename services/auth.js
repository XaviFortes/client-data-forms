import api from './api';

export default {
  /**
   * Login admin user
   * @param {string} email - Admin email
   * @param {string} password - Admin password
   * @returns {Promise} - Response with tokens
   */
  login(email, password) {
    return api.post('/auth/login', { email, password });
  },

  /**
   * Register admin user (typically restricted)
   * @param {Object} adminData - Admin registration data
   * @returns {Promise} - Response with user data
   */
  register(adminData) {
    return api.post('/auth/register', adminData);
  },

  /**
   * Logout current user
   * @returns {Promise} - Response
   */
  logout() {
    const refreshToken = localStorage.getItem('refresh_token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    
    return api.post('/auth/logout', { refreshToken });
  },

  /**
   * Get current authenticated user profile
   * @returns {Promise} - Response with user data
   */
  getProfile() {
    return api.get('/auth/profile');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Store authentication data in localStorage
   * @param {Object} authData - Contains token, refreshToken and userData
   */
  setAuthData(authData) {
    localStorage.setItem('auth_token', authData.token);
    localStorage.setItem('refresh_token', authData.refreshToken);
    if (authData.user) {
      localStorage.setItem('user_data', JSON.stringify(authData.user));
    }
  }
};
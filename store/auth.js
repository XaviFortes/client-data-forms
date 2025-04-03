import AuthService from '@/services/auth';

export const state = () => ({
  user: null,
  token: null,
  loading: false,
  error: null
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_AUTH(state) {
    state.user = null;
    state.token = null;
  }
};

export const actions = {
  async login({ commit }, credentials) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await AuthService.login(credentials.email, credentials.password);
      const { token, refreshToken, user } = response.data;
      
      // Store auth data in localStorage
      AuthService.setAuthData({ token, refreshToken, user });
      
      // Update state
      commit('SET_USER', user);
      commit('SET_TOKEN', token);
      
      return user;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Authentication failed');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async logout({ commit }) {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      commit('CLEAR_AUTH');
    }
  },
  
  async getProfile({ commit }) {
    try {
      commit('SET_LOADING', true);
      
      const response = await AuthService.getProfile();
      const user = response.data;
      
      commit('SET_USER', user);
      return user;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to get profile');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  // Initialize auth state from localStorage
  initAuth({ commit }) {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token) {
      commit('SET_TOKEN', token);
    }
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        commit('SET_USER', user);
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
  }
};

export const getters = {
  isAuthenticated: state => !!state.token,
  currentUser: state => state.user,
  isLoading: state => state.loading,
  error: state => state.error
};
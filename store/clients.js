import ClientService from '@/services/clients';

export const state = () => ({
  clients: [],
  totalClients: 0,
  currentClient: null,
  clientSubmissions: [],
  loading: false,
  error: null
});

export const mutations = {
  SET_CLIENTS(state, { clients, total }) {
    state.clients = clients;
    state.totalClients = total;
  },
  SET_CURRENT_CLIENT(state, client) {
    state.currentClient = client;
  },
  SET_CLIENT_SUBMISSIONS(state, submissions) {
    state.clientSubmissions = submissions;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

export const actions = {
  async fetchClients({ commit }, params) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await ClientService.getClients(params);
      commit('SET_CLIENTS', {
        clients: response.data.clients,
        total: response.data.total
      });
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch clients');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async fetchClient({ commit }, clientId) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await ClientService.getClient(clientId);
      commit('SET_CURRENT_CLIENT', response.data);
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch client');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async createClient({ commit }, clientData) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await ClientService.createClient(clientData);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to create client');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async updateClient({ commit }, { clientId, clientData }) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await ClientService.updateClient(clientId, clientData);
      commit('SET_CURRENT_CLIENT', response.data);
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to update client');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async deleteClient({ commit }, clientId) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      await ClientService.deleteClient(clientId);
      return true;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to delete client');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async fetchClientSubmissions({ commit }, { clientId, params }) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await ClientService.getClientSubmissions(clientId, params);
      commit('SET_CLIENT_SUBMISSIONS', response.data);
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch client submissions');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async sendReminder({ commit }, { clientId, reminderData }) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await ClientService.sendReminder(clientId, reminderData);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to send reminder');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  }
};

export const getters = {
  allClients: state => state.clients,
  totalClients: state => state.totalClients,
  currentClient: state => state.currentClient,
  clientSubmissions: state => state.clientSubmissions,
  isLoading: state => state.loading,
  error: state => state.error
};
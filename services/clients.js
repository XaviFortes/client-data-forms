import api from './api';

export default {
  /**
   * Get all clients
   * @param {Object} params - Query parameters
   * @returns {Promise} - Response with clients
   */
  getClients(params = {}) {
    return api.get('/clients', { params });
  },

  /**
   * Get a specific client by ID
   * @param {string} clientId - Client ID
   * @returns {Promise} - Response with client data
   */
  getClient(clientId) {
    return api.get(`/clients/${clientId}`);
  },

  /**
   * Create a new client
   * @param {Object} clientData - Client information
   * @returns {Promise} - Response with created client
   */
  createClient(clientData) {
    return api.post('/clients', clientData);
  },

  /**
   * Update an existing client
   * @param {string} clientId - Client ID
   * @param {Object} clientData - Updated client data
   * @returns {Promise} - Response with updated client
   */
  updateClient(clientId, clientData) {
    return api.put(`/clients/${clientId}`, clientData);
  },

  /**
   * Delete a client
   * @param {string} clientId - Client ID
   * @returns {Promise} - Response
   */
  deleteClient(clientId) {
    return api.delete(`/clients/${clientId}`);
  },

  /**
   * Get all submissions for a client
   * @param {string} clientId - Client ID
   * @param {Object} params - Query parameters
   * @returns {Promise} - Response with submissions
   */
  getClientSubmissions(clientId, params = {}) {
    return api.get(`/clients/${clientId}/submissions`, { params });
  },

  /**
   * Send reminder to client
   * @param {string} clientId - Client ID
   * @param {Object} reminderData - Reminder details including form ID
   * @returns {Promise} - Response
   */
  sendReminder(clientId, reminderData) {
    return api.post(`/clients/${clientId}/reminders`, reminderData);
  }
};
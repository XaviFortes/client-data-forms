import api from './api';

export default {
  /**
   * Get all forms
   * @param {Object} params - Query parameters for filtering
   * @returns {Promise} - Response with forms
   */
  getForms(params = {}) {
    return api.get('/forms', { params });
  },

  /**
   * Get a specific form by ID
   * @param {string} formId - Form ID
   * @returns {Promise} - Response with form data
   */
  getForm(formId) {
    return api.get(`/forms/${formId}`);
  },

  /**
   * Create a new form
   * @param {Object} formData - Form configuration
   * @returns {Promise} - Response with created form
   */
  createForm(formData) {
    return api.post('/forms', formData);
  },

  /**
   * Update an existing form
   * @param {string} formId - Form ID
   * @param {Object} formData - Updated form data
   * @returns {Promise} - Response with updated form
   */
  updateForm(formId, formData) {
    return api.put(`/forms/${formId}`, formData);
  },

  /**
   * Delete a form
   * @param {string} formId - Form ID
   * @returns {Promise} - Response
   */
  deleteForm(formId) {
    return api.delete(`/forms/${formId}`);
  },

  /**
   * Create a template from an existing form
   * @param {string} formId - Form ID
   * @param {Object} templateData - Template info (name, description)
   * @returns {Promise} - Response with created template
   */
  createTemplate(formId, templateData) {
    return api.post(`/forms/${formId}/template`, templateData);
  },

  /**
   * Get all form templates
   * @returns {Promise} - Response with templates
   */
  getTemplates() {
    return api.get('/templates');
  },

  /**
   * Generate a unique link for a form
   * @param {string} formId - Form ID
   * @param {Object} linkOptions - Options for the link (expiry, one-time use)
   * @returns {Promise} - Response with unique link
   */
  generateUniqueLink(formId, linkOptions) {
    return api.post(`/forms/${formId}/link`, linkOptions);
  },

  /**
   * Get form submissions
   * @param {string} formId - Form ID
   * @param {Object} params - Query parameters
   * @returns {Promise} - Response with submissions
   */
  getFormSubmissions(formId, params = {}) {
    return api.get(`/forms/${formId}/submissions`, { params });
  }
};
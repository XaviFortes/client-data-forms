import FormService from '@/services/forms';

export const state = () => ({
  forms: [],
  currentForm: null,
  formBuilder: {
    title: '',
    description: '',
    elements: [],
    currentElement: null
  },
  templates: [],
  loading: false,
  error: null
});

export const mutations = {
  SET_FORMS(state, forms) {
    state.forms = forms;
  },
  SET_CURRENT_FORM(state, form) {
    state.currentForm = form;
  },
  SET_FORM_BUILDER_TITLE(state, title) {
    state.formBuilder.title = title;
  },
  SET_FORM_BUILDER_DESCRIPTION(state, description) {
    state.formBuilder.description = description;
  },
  SET_FORM_BUILDER_ELEMENTS(state, elements) {
    state.formBuilder.elements = elements;
  },
  ADD_FORM_ELEMENT(state, element) {
    state.formBuilder.elements.push(element);
  },
  UPDATE_FORM_ELEMENT(state, { index, element }) {
    state.formBuilder.elements[index] = element;
  },
  REMOVE_FORM_ELEMENT(state, index) {
    state.formBuilder.elements.splice(index, 1);
  },
  REORDER_FORM_ELEMENTS(state, { oldIndex, newIndex }) {
    const element = state.formBuilder.elements.splice(oldIndex, 1)[0];
    state.formBuilder.elements.splice(newIndex, 0, element);
  },
  SET_CURRENT_ELEMENT(state, element) {
    state.formBuilder.currentElement = element;
  },
  SET_TEMPLATES(state, templates) {
    state.templates = templates;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  RESET_FORM_BUILDER(state) {
    state.formBuilder = {
      title: '',
      description: '',
      elements: [],
      currentElement: null
    };
  }
};

export const actions = {
  async fetchForms({ commit }, params) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await FormService.getForms(params);
      commit('SET_FORMS', response.data);
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch forms');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async fetchForm({ commit }, formId) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await FormService.getForm(formId);
      const form = response.data;
      
      commit('SET_CURRENT_FORM', form);
      // Initialize form builder with existing form data
      commit('SET_FORM_BUILDER_TITLE', form.title);
      commit('SET_FORM_BUILDER_DESCRIPTION', form.description);
      commit('SET_FORM_BUILDER_ELEMENTS', form.elements);
      
      return form;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch form');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async saveForm({ commit, state }) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const formData = {
        title: state.formBuilder.title,
        description: state.formBuilder.description,
        elements: state.formBuilder.elements
      };
      
      let response;
      if (state.currentForm?._id) {
        // Update existing form
        response = await FormService.updateForm(state.currentForm._id, formData);
      } else {
        // Create new form
        response = await FormService.createForm(formData);
      }
      
      commit('SET_CURRENT_FORM', response.data);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to save form');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async deleteForm({ commit }, formId) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      await FormService.deleteForm(formId);
      return true;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to delete form');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async fetchTemplates({ commit }) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await FormService.getTemplates();
      commit('SET_TEMPLATES', response.data);
      
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch templates');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async createTemplate({ commit }, { formId, templateData }) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await FormService.createTemplate(formId, templateData);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to create template');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async generateUniqueLink({ commit }, { formId, linkOptions }) {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      const response = await FormService.generateUniqueLink(formId, linkOptions);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to generate link');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  // Form builder actions
  addFormElement({ commit }, element) {
    const newElement = {
      id: Date.now().toString(),
      type: element.type,
      label: element.label || 'New Field',
      required: false,
      ...element
    };
    commit('ADD_FORM_ELEMENT', newElement);
    commit('SET_CURRENT_ELEMENT', newElement);
  },
  
  updateFormElement({ commit, state }, updatedElement) {
    const index = state.formBuilder.elements.findIndex(el => el.id === updatedElement.id);
    if (index !== -1) {
      commit('UPDATE_FORM_ELEMENT', { index, element: updatedElement });
      commit('SET_CURRENT_ELEMENT', updatedElement);
    }
  },
  
  removeFormElement({ commit, state }, elementId) {
    const index = state.formBuilder.elements.findIndex(el => el.id === elementId);
    if (index !== -1) {
      commit('REMOVE_FORM_ELEMENT', index);
      commit('SET_CURRENT_ELEMENT', null);
    }
  },
  
  reorderFormElements({ commit }, { oldIndex, newIndex }) {
    commit('REORDER_FORM_ELEMENTS', { oldIndex, newIndex });
  },
  
  setCurrentElement({ commit }, element) {
    commit('SET_CURRENT_ELEMENT', element);
  },
  
  updateFormTitle({ commit }, title) {
    commit('SET_FORM_BUILDER_TITLE', title);
  },
  
  updateFormDescription({ commit }, description) {
    commit('SET_FORM_BUILDER_DESCRIPTION', description);
  },
  
  resetFormBuilder({ commit }) {
    commit('RESET_FORM_BUILDER');
  }
};

export const getters = {
  allForms: state => state.forms,
  currentForm: state => state.currentForm,
  formElements: state => state.formBuilder.elements,
  currentElement: state => state.formBuilder.currentElement,
  formTitle: state => state.formBuilder.title,
  formDescription: state => state.formBuilder.description,
  allTemplates: state => state.templates,
  isLoading: state => state.loading,
  error: state => state.error
};
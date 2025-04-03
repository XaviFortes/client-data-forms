<template>
  <div class="form-builder">
    <div class="page-header">
      <div>
        <h1 class="page-title">Form Builder</h1>
        <p class="page-description">Create and modify dynamic forms for your clients</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" :disabled="loading" @click="saveDraft">
          <span v-if="loading && isDraftSaving">Saving...</span>
          <span v-else>Save Draft</span>
        </button>
        <button class="btn btn-primary" :disabled="loading" @click="publishForm">
          <span v-if="loading && !isDraftSaving">Publishing...</span>
          <span v-else>Publish Form</span>
        </button>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div class="form-editor-container">
      <div class="form-tools">
        <div class="tools-header">
          <h3>Form Elements</h3>
        </div>
        
        <div class="tool-category">
          <p class="category-title">BASIC INPUTS</p>
          <div class="tool-items">
            <div 
              v-for="tool in basicInputTools" 
              :key="tool.type"
              class="tool-item" 
              draggable="true"
              @dragstart="handleDragStart($event, tool)"
            >
              <Icon :name="tool.icon" />
              <span>{{ tool.label }}</span>
            </div>
          </div>
        </div>

        <div class="tool-category">
          <p class="category-title">SELECTION</p>
          <div class="tool-items">
            <div 
              v-for="tool in selectionTools" 
              :key="tool.type"
              class="tool-item" 
              draggable="true"
              @dragstart="handleDragStart($event, tool)"
            >
              <Icon :name="tool.icon" />
              <span>{{ tool.label }}</span>
            </div>
          </div>
        </div>

        <div class="tool-category">
          <p class="category-title">ADVANCED</p>
          <div class="tool-items">
            <div 
              v-for="tool in advancedTools" 
              :key="tool.type"
              class="tool-item" 
              draggable="true"
              @dragstart="handleDragStart($event, tool)"
            >
              <Icon :name="tool.icon" />
              <span>{{ tool.label }}</span>
            </div>
          </div>
        </div>

        <div class="tool-category">
          <p class="category-title">LAYOUT</p>
          <div class="tool-items">
            <div 
              v-for="tool in layoutTools" 
              :key="tool.type"
              class="tool-item" 
              draggable="true"
              @dragstart="handleDragStart($event, tool)"
            >
              <Icon :name="tool.icon" />
              <span>{{ tool.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-canvas">
        <div class="form-header-editor">
          <input 
            type="text" 
            class="form-title-input" 
            placeholder="Enter Form Title" 
            :value="formTitle"
            @input="updateFormTitle($event.target.value)"
          >
          <textarea 
            class="form-description-input" 
            placeholder="Add a description for this form (optional)"
            :value="formDescription"
            @input="updateFormDescription($event.target.value)"
          />
        </div>

        <div 
          class="form-elements"
          @dragover="handleDragOver"
          @drop="handleDrop"
        >
          <div v-if="formElements.length === 0" class="drop-zone">
            <div class="drop-message">
              <Icon name="mdi:cursor-move" size="48px" />
              <p>Drag and drop form elements here</p>
              <span>or</span>
              <button class="btn btn-outline" @click="showElementPicker = true">Add Element</button>
            </div>
          </div>
          
          <div v-else class="form-elements-list">
            <div 
              v-for="(element, index) in formElements" 
              :key="element.id"
              class="form-element-wrapper"
              :class="{ 'selected': currentElement && currentElement.id === element.id }"
              @click="setCurrentElement(element)"
            >
              <div class="form-element-drag-handle" draggable="true" @dragstart="handleElementDragStart($event, index)">
                <Icon name="mdi:drag" />
              </div>
              
              <div class="form-element-content">
                <component 
                  :is="getElementComponent(element.type)" 
                  :element="element" 
                  :preview="true"
                />
              </div>
              
              <div class="form-element-actions">
                <button class="element-action-btn" @click.stop="duplicateElement(element)">
                  <Icon name="mdi:content-copy" />
                </button>
                <button class="element-action-btn delete" @click.stop="removeElement(element.id)">
                  <Icon name="mdi:delete" />
                </button>
              </div>
            </div>
            
            <div 
              class="element-drop-zone"
              @dragover.prevent
              @drop="handleElementDrop($event, formElements.length)"
            />
          </div>
        </div>
      </div>

      <div class="form-properties">
        <div class="properties-header">
          <h3>Properties</h3>
        </div>
        
        <div v-if="!currentElement" class="no-selection-message">
          <p>Select a form element to edit its properties</p>
        </div>
        
        <div v-else class="properties-panel">
          <div class="property-group">
            <label class="property-label">Label</label>
            <input 
              type="text" 
              class="property-input" 
              :value="currentElement.label" 
              @input="updateElementProperty('label', $event.target.value)"
            >
          </div>
          
          <div class="property-group">
            <label class="property-label">Name</label>
            <input 
              type="text" 
              class="property-input" 
              :value="currentElement.name || generateNameFromLabel(currentElement.label)" 
              @input="updateElementProperty('name', $event.target.value)"
            >
            <p class="property-help">Name used in form data</p>
          </div>
          
          <div class="property-group">
            <div class="property-checkbox">
              <input 
                :id="'required-' + currentElement.id" 
                type="checkbox" 
                :checked="currentElement.required" 
                @change="updateElementProperty('required', $event.target.checked)"
              >
              <label :for="'required-' + currentElement.id">Required field</label>
            </div>
          </div>
          
          <!-- Conditional properties based on element type -->
          <div v-if="currentElement.type === 'text' || currentElement.type === 'textarea'" class="property-group">
            <label class="property-label">Placeholder</label>
            <input 
              type="text" 
              class="property-input" 
              :value="currentElement.placeholder" 
              @input="updateElementProperty('placeholder', $event.target.value)"
            >
          </div>
          
          <div v-if="currentElement.type === 'text'" class="property-group">
            <label class="property-label">Validation Pattern</label>
            <select 
              class="property-select"
              :value="currentElement.validationType || 'none'"
              @change="updateElementProperty('validationType', $event.target.value)"
            >
              <option value="none">None</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="zipcode">Zip Code</option>
              <option value="custom">Custom Pattern</option>
            </select>
          </div>
          
          <div v-if="currentElement.type === 'select' || currentElement.type === 'radio' || currentElement.type === 'checkbox'" class="property-group">
            <label class="property-label">Options</label>
            <div v-for="(option, optionIndex) in currentElement.options || []" :key="optionIndex" class="option-item">
              <input 
                type="text" 
                class="property-input" 
                :value="option.label" 
                @input="updateOptionProperty(optionIndex, 'label', $event.target.value)"
              >
              <button class="option-remove-btn" @click.prevent="removeOption(optionIndex)">
                <Icon name="mdi:close" />
              </button>
            </div>
            <button class="btn btn-outline btn-sm btn-add-option" @click="addOption">
              <Icon name="mdi:plus" />
              <span>Add Option</span>
            </button>
          </div>
          
          <div v-if="currentElement.type === 'file'" class="property-group">
            <label class="property-label">Allowed File Types</label>
            <input 
              type="text" 
              class="property-input" 
              :value="currentElement.allowedTypes" 
              @input="updateElementProperty('allowedTypes', $event.target.value)"
            >
            <p class="property-help">Comma-separated list (e.g., .pdf,.jpg,.png)</p>
          </div>
          
          <div v-if="isConditionalLogicEnabled" class="property-group conditional-logic">
            <label class="property-label">Conditional Logic</label>
            <button class="btn btn-outline btn-sm" @click="showConditionalLogicModal = true">
              <Icon name="mdi:code-braces" />
              <span>Configure Conditions</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="form-builder-footer">
      <div class="conditional-logic-toggle">
        <div class="toggle-switch">
          <input 
            id="conditional-logic" 
            v-model="isConditionalLogicEnabled" 
            type="checkbox"
            class="toggle-input"
          >
          <label for="conditional-logic" class="toggle-label"/>
        </div>
        <label for="conditional-logic" class="toggle-text">Enable Conditional Logic</label>
      </div>
      <div>
        <button class="btn btn-secondary" @click="previewForm">Preview Form</button>
      </div>
    </div>
    
    <!-- Element Picker Modal -->
    <div v-if="showElementPicker" class="modal-overlay" @click="showElementPicker = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Add Form Element</h3>
          <button class="modal-close" @click="showElementPicker = false">
            <Icon name="mdi:close" />
          </button>
        </div>
        <div class="modal-body">
          <div class="element-picker-grid">
            <div 
              v-for="tool in allTools" 
              :key="tool.type"
              class="element-picker-item"
              @click="addNewElement(tool)"
            >
              <div class="element-picker-icon">
                <Icon :name="tool.icon" />
              </div>
              <div class="element-picker-label">{{ tool.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Preview Modal -->
    <div v-if="showPreview" class="modal-overlay" @click="showPreview = false">
      <div class="modal-content preview-modal" @click.stop>
        <div class="modal-header">
          <h3>Form Preview</h3>
          <button class="modal-close" @click="showPreview = false">
            <Icon name="mdi:close" />
          </button>
        </div>
        <div class="modal-body">
          <div class="preview-form">
            <h2 class="preview-form-title">{{ formTitle }}</h2>
            <p class="preview-form-description">{{ formDescription }}</p>
            
            <div class="preview-form-elements">
              <div v-for="element in formElements" :key="element.id" class="preview-form-element">
                <component 
                  :is="getElementComponent(element.type)" 
                  :element="element" 
                  :preview="true"
                />
              </div>
            </div>
            
            <div class="preview-form-actions">
              <button class="btn btn-outline">Cancel</button>
              <button class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic would go here
</script>

<style scoped>
.form-builder {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #fff;
}

.page-description {
  color: #888;
  font-size: 0.95rem;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background-color: #6200ea;
  color: white;
}

.btn-primary:hover {
  background-color: #7c4dff;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #6200ea;
  color: #6200ea;
}

.btn-outline:hover {
  background-color: rgba(98, 0, 234, 0.05);
}

.btn-secondary {
  background-color: #252525;
  color: #e0e0e0;
}

.btn-secondary:hover {
  background-color: #333;
}

.form-editor-container {
  display: flex;
  flex: 1;
  gap: 20px;
  min-height: 600px;
}

.form-tools {
  width: 240px;
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tools-header, .properties-header {
  padding: 16px;
  border-bottom: 1px solid #333;
}

.tools-header h3, .properties-header h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

.tool-category {
  padding: 12px 0;
}

.category-title {
  font-size: 0.75rem;
  color: #888;
  padding: 0 16px;
  margin-bottom: 8px;
  letter-spacing: 0.8px;
}

.tool-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tool-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: move;
  transition: background-color 0.2s;
}

.tool-item:hover {
  background-color: #252525;
}

.tool-item i {
  margin-right: 10px;
  font-size: 1.1rem;
}

.form-canvas {
  flex: 1;
  background-color: #1e1e1e;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.form-header-editor {
  padding: 20px;
  border-bottom: 1px solid #333;
}

.form-title-input {
  width: 100%;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 8px 0;
  margin-bottom: 8px;
  outline: none;
}

.form-description-input {
  width: 100%;
  background-color: transparent;
  border: none;
  color: #888;
  font-size: 0.95rem;
  padding: 8px 0;
  outline: none;
  resize: none;
  height: 60px;
}

.form-elements {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.drop-zone {
  min-height: 300px;
  border: 2px dashed #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drop-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  color: #888;
}

.drop-message i {
  margin-bottom: 16px;
  opacity: 0.5;
}

.drop-message p {
  margin-bottom: 12px;
  font-size: 1rem;
}

.drop-message span {
  margin: 8px 0;
  font-size: 0.9rem;
}

.form-properties {
  width: 280px;
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
}

.no-selection-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  padding: 0 16px;
  color: #888;
  text-align: center;
}

.form-builder-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px 0;
  border-top: 1px solid #333;
}

.conditional-logic-toggle {
  display: flex;
  align-items: center;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333;
  transition: .4s;
  border-radius: 24px;
}

.toggle-label:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: #e0e0e0;
  transition: .4s;
  border-radius: 50%;
}

.toggle-input:checked + .toggle-label {
  background-color: #6200ea;
}

.toggle-input:checked + .toggle-label:before {
  transform: translateX(16px);
}

.toggle-text {
  margin-left: 10px;
  cursor: pointer;
}
</style>
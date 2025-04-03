<template>
  <AdminLayout current-route="dashboard">
    <div class="admin-dashboard">
      <div class="page-header">
        <div>
          <h1 class="page-title">Dashboard</h1>
          <p class="page-description">Welcome back, Admin</p>
        </div>
        <div class="date-display">
          <Icon name="mdi:calendar" />
          <span>{{ currentDate }}</span>
        </div>
      </div>

      <div class="dashboard-summary">
        <div class="summary-cards">
          <div class="summary-card">
            <div class="card-content">
              <h3 class="card-value">64</h3>
              <p class="card-label">Active Forms</p>
            </div>
            <div class="card-icon">
              <Icon name="mdi:form-select" />
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-content">
              <h3 class="card-value">158</h3>
              <p class="card-label">Total Clients</p>
            </div>
            <div class="card-icon">
              <Icon name="mdi:account-group" />
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-content">
              <h3 class="card-value">23</h3>
              <p class="card-label">Pending Forms</p>
            </div>
            <div class="card-icon pending">
              <Icon name="mdi:clock-outline" />
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-content">
              <h3 class="card-value">89</h3>
              <p class="card-label">Completed This Month</p>
            </div>
            <div class="card-icon completed">
              <Icon name="mdi:check-circle-outline" />
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="recent-activity">
          <div class="section-header">
            <h2 class="section-title">Recent Activity</h2>
            <button class="btn btn-text">View All</button>
          </div>
          
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">
                <Icon name="mdi:file-document-outline" />
              </div>
              <div class="activity-content">
                <div class="activity-header">
                  <p class="activity-title">New form submission</p>
                  <span class="activity-time">2 hours ago</span>
                </div>
                <p class="activity-description">Sarah Johnson completed "Client Intake Form"</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon uploaded">
                <Icon name="mdi:file-upload-outline" />
              </div>
              <div class="activity-content">
                <div class="activity-header">
                  <p class="activity-title">File uploaded</p>
                  <span class="activity-time">4 hours ago</span>
                </div>
                <p class="activity-description">Michael Chen uploaded 3 files to "Tax Documents"</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon created">
                <Icon name="mdi:plus-circle-outline" />
              </div>
              <div class="activity-content">
                <div class="activity-header">
                  <p class="activity-title">Form created</p>
                  <span class="activity-time">Yesterday</span>
                </div>
                <p class="activity-description">You created a new form "2025 Client Questionnaire"</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon reminder">
                <Icon name="mdi:bell-outline" />
              </div>
              <div class="activity-content">
                <div class="activity-header">
                  <p class="activity-title">Reminder sent</p>
                  <span class="activity-time">Yesterday</span>
                </div>
                <p class="activity-description">Reminder sent to 5 clients with pending submissions</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">
                <Icon name="mdi:account-plus-outline" />
              </div>
              <div class="activity-content">
                <div class="activity-header">
                  <p class="activity-title">New client added</p>
                  <span class="activity-time">2 days ago</span>
                </div>
                <p class="activity-description">Emily Rodriguez was added as a new client</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="quick-actions">
          <div class="section-header">
            <h2 class="section-title">Quick Actions</h2>
          </div>
          
          <div class="action-buttons-grid">
            <button class="action-button">
              <Icon name="mdi:file-plus-outline" />
              <span>Create Form</span>
            </button>
            
            <button class="action-button">
              <Icon name="mdi:account-plus-outline" />
              <span>Add Client</span>
            </button>
            
            <button class="action-button">
              <Icon name="mdi:link-variant" />
              <span>Generate Link</span>
            </button>
            
            <button class="action-button">
              <Icon name="mdi:email-outline" />
              <span>Send Reminder</span>
            </button>
            
            <button class="action-button">
              <Icon name="mdi:file-export-outline" />
              <span>Export Data</span>
            </button>
            
            <button class="action-button">
              <Icon name="mdi:cog-outline" />
              <span>Settings</span>
            </button>
          </div>
          
          <div class="pending-submissions">
            <div class="section-header">
              <h3 class="subsection-title">Pending Submissions</h3>
              <button class="btn btn-text">View All</button>
            </div>
            
            <div class="pending-list">
              <div class="pending-item">
                <div class="pending-info">
                  <p class="pending-client">Sarah Johnson</p>
                  <p class="pending-form">Client Intake Form</p>
                </div>
                <div class="pending-actions">
                  <span class="pending-date">Due Apr 10, 2025</span>
                  <button class="btn btn-outline btn-sm">Send Reminder</button>
                </div>
              </div>
              
              <div class="pending-item">
                <div class="pending-info">
                  <p class="pending-client">Michael Chen</p>
                  <p class="pending-form">Tax Information Request</p>
                </div>
                <div class="pending-actions">
                  <span class="pending-date">Due Apr 15, 2025</span>
                  <button class="btn btn-outline btn-sm">Send Reminder</button>
                </div>
              </div>
              
              <div class="pending-item">
                <div class="pending-info">
                  <p class="pending-client">Emily Rodriguez</p>
                  <p class="pending-form">2025 Client Questionnaire</p>
                </div>
                <div class="pending-actions">
                  <span class="pending-date">Due Apr 20, 2025</span>
                  <button class="btn btn-outline btn-sm">Send Reminder</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '~/components/admin/AdminLayout.vue';

const currentDate = ref(new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}));
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
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

.date-display {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 0.95rem;
}

.dashboard-summary {
  margin-bottom: 32px;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.summary-card {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-value {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #fff;
}

.card-label {
  font-size: 0.95rem;
  color: #888;
  margin: 0;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(98, 0, 234, 0.1);
  color: #6200ea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.card-icon.pending {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.card-icon.completed {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
}

.subsection-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  color: #fff;
}

.btn-text {
  background: transparent;
  border: none;
  color: #6200ea;
  padding: 8px;
  cursor: pointer;
  font-weight: 500;
}

.btn-text:hover {
  text-decoration: underline;
}

.recent-activity {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #333;
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(98, 0, 234, 0.1);
  color: #6200ea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.activity-icon.uploaded {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.activity-icon.created {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.activity-icon.reminder {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.activity-content {
  flex: 1;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.activity-title {
  font-weight: 500;
  margin: 0;
  color: #fff;
}

.activity-time {
  font-size: 0.85rem;
  color: #888;
}

.activity-description {
  margin: 0;
  color: #aaa;
  font-size: 0.95rem;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.action-buttons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.action-button {
  background-color: #1e1e1e;
  border: none;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: #252525;
  transform: translateY(-2px);
}

.action-button i {
  font-size: 1.5rem;
  color: #6200ea;
}

.pending-submissions {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
}

.pending-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pending-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid #333;
}

.pending-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.pending-client {
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #fff;
}

.pending-form {
  font-size: 0.9rem;
  color: #888;
  margin: 0;
}

.pending-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.pending-date {
  font-size: 0.85rem;
  color: #f59e0b;
}

.btn {
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #555;
  color: #e0e0e0;
}

.btn-outline:hover {
  background-color: #252525;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.85rem;
}
</style>
<template>
  <div class="client-overview">
    <div class="page-header">
      <div>
        <h1 class="page-title">Client Overview</h1>
        <p class="page-description">View and manage your clients and their form submissions</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline">
          <Icon name="mdi:filter-variant" />
          <span>Filter</span>
        </button>
        <button class="btn btn-primary">
          <Icon name="mdi:account-plus" />
          <span>Add New Client</span>
        </button>
      </div>
    </div>

    <div class="dashboard-metrics">
      <div class="metric-card">
        <div class="metric-icon">
          <Icon name="mdi:account-multiple" />
        </div>
        <div class="metric-details">
          <h3 class="metric-value">158</h3>
          <p class="metric-label">Total Clients</p>
        </div>
      </div>
      
      <div class="metric-card">
        <div class="metric-icon active">
          <Icon name="mdi:clipboard-text-outline" />
        </div>
        <div class="metric-details">
          <h3 class="metric-value">64</h3>
          <p class="metric-label">Active Forms</p>
        </div>
      </div>
      
      <div class="metric-card">
        <div class="metric-icon pending">
          <Icon name="mdi:clock-outline" />
        </div>
        <div class="metric-details">
          <h3 class="metric-value">23</h3>
          <p class="metric-label">Pending Submissions</p>
        </div>
      </div>
      
      <div class="metric-card">
        <div class="metric-icon completed">
          <Icon name="mdi:check-circle-outline" />
        </div>
        <div class="metric-details">
          <h3 class="metric-value">89</h3>
          <p class="metric-label">Completed This Month</p>
        </div>
      </div>
    </div>

    <div class="client-table-container">
      <div class="table-header">
        <div class="search-container">
          <Icon name="mdi:magnify" />
          <input type="text" placeholder="Search clients..." class="search-input">
        </div>
        
        <div class="table-actions">
          <button class="btn btn-icon">
            <Icon name="mdi:download" />
          </button>
          <button class="btn btn-icon">
            <Icon name="mdi:refresh" />
          </button>
        </div>
      </div>
      
      <table class="client-table">
        <thead>
          <tr>
            <th>
              <div class="th-content">
                <input type="checkbox" class="table-checkbox" >
                <span>Client Name</span>
              </div>
            </th>
            <th>Email</th>
            <th>Status</th>
            <th>Last Activity</th>
            <th>Pending Forms</th>
            <th>Completed Forms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="client-info">
                <input type="checkbox" class="table-checkbox" >
                <img src="/avatar-placeholder.jpg" alt="Client" class="client-avatar" >
                <span class="client-name">Sarah Johnson</span>
              </div>
            </td>
            <td>sarah.johnson@example.com</td>
            <td>
              <span class="status-badge active">Active</span>
            </td>
            <td>Today, 2:30 PM</td>
            <td>3</td>
            <td>12</td>
            <td>
              <div class="action-buttons">
                <button class="btn btn-icon">
                  <Icon name="mdi:eye-outline" />
                </button>
                <button class="btn btn-icon">
                  <Icon name="mdi:pencil-outline" />
                </button>
                <button class="btn btn-icon">
                  <Icon name="mdi:link-variant" />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="client-info">
                <input type="checkbox" class="table-checkbox" >
                <img src="/avatar-placeholder.jpg" alt="Client" class="client-avatar" >
                <span class="client-name">Michael Chen</span>
              </div>
            </td>
            <td>michael.chen@example.com</td>
            <td>
              <span class="status-badge pending">Pending</span>
            </td>
            <td>Yesterday, 10:15 AM</td>
            <td>2</td>
            <td>5</td>
            <td>
              <div class="action-buttons">
                <button class="btn btn-icon">
                  <Icon name="mdi:eye-outline" />
                </button>
                <button class="btn btn-icon">
                  <Icon name="mdi:pencil-outline" />
                </button>
                <button class="btn btn-icon">
                  <Icon name="mdi:link-variant" />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="client-info">
                <input type="checkbox" class="table-checkbox" >
                <img src="/avatar-placeholder.jpg" alt="Client" class="client-avatar" >
                <span class="client-name">Emily Rodriguez</span>
              </div>
            </td>
            <td>emily.r@example.com</td>
            <td>
              <span class="status-badge inactive">Inactive</span>
            </td>
            <td>Apr 12, 2025</td>
            <td>0</td>
            <td>8</td>
            <td>
              <div class="action-buttons">
                <button class="btn btn-icon">
                  <Icon name="mdi:eye-outline" />
                </button>
                <button class="btn btn-icon">
                  <Icon name="mdi:pencil-outline" />
                </button>
                <button class="btn btn-icon">
                  <Icon name="mdi:link-variant" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="table-pagination">
        <div class="pagination-info">
          Showing 1-10 of 158 clients
        </div>
        <div class="pagination-controls">
          <button class="pagination-btn" disabled>
            <Icon name="mdi:chevron-left" />
          </button>
          <button class="pagination-btn page-number active">1</button>
          <button class="pagination-btn page-number">2</button>
          <button class="pagination-btn page-number">3</button>
          <span class="pagination-ellipsis">...</span>
          <button class="pagination-btn page-number">16</button>
          <button class="pagination-btn">
            <Icon name="mdi:chevron-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic would go here
</script>

<style scoped>
.client-overview {
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  padding: 8px;
  background-color: transparent;
  color: #e0e0e0;
}

.btn-icon:hover {
  background-color: #252525;
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
  border: 1px solid #555;
  color: #e0e0e0;
}

.btn-outline:hover {
  background-color: #252525;
}

.dashboard-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.metric-card {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(98, 0, 234, 0.1);
  color: #6200ea;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 1.5rem;
}

.metric-icon.active {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.metric-icon.pending {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.metric-icon.completed {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #fff;
}

.metric-label {
  font-size: 0.9rem;
  color: #888;
  margin: 0;
}

.client-table-container {
  background-color: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #252525;
  padding: 8px 16px;
  border-radius: 8px;
  width: 280px;
}

.search-input {
  background: transparent;
  border: none;
  color: #e0e0e0;
  margin-left: 8px;
  width: 100%;
  outline: none;
}

.table-actions {
  display: flex;
  gap: 8px;
}

.client-table {
  width: 100%;
  border-collapse: collapse;
}

.client-table th,
.client-table td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid #333;
}

.client-table th {
  color: #888;
  font-weight: 500;
  font-size: 0.9rem;
}

.th-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #6200ea;
  cursor: pointer;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.client-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.client-name {
  font-weight: 500;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-block;
}

.status-badge.active {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.status-badge.pending {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-badge.inactive {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.table-pagination {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #333;
}

.pagination-info {
  color: #888;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pagination-btn {
  background: transparent;
  border: none;
  color: #e0e0e0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.pagination-btn:hover {
  background-color: #252525;
}

.pagination-btn.page-number.active {
  background-color: #6200ea;
  color: white;
}

.pagination-btn:disabled {
  color: #555;
  cursor: not-allowed;
}

.pagination-ellipsis {
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
}
</style>
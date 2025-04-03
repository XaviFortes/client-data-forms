<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="logo-container">
        <!--<img src="/logo.svg" alt="Logo" class="logo" >-->
        <h2>Admin</h2>
      </div>
      
      <nav class="nav-menu">
        <div class="nav-section">
          <p class="nav-title">FORMS</p>
          <div class="nav-item" :class="{ active: currentRoute === 'forms' }">
            <Icon name="mdi:form-select" />
            <span>Form Builder</span>
          </div>
          <div class="nav-item" :class="{ active: currentRoute === 'form-templates' }">
            <Icon name="mdi:file-document-multiple" />
            <span>Templates</span>
          </div>
        </div>
        
        <div class="nav-section">
          <p class="nav-title">CLIENTS</p>
          <div class="nav-item" :class="{ active: currentRoute === 'clients' }">
            <Icon name="mdi:account-group" />
            <span>Client Overview</span>
          </div>
          <div class="nav-item" :class="{ active: currentRoute === 'submissions' }">
            <Icon name="mdi:clipboard-text" />
            <span>Submissions</span>
          </div>
        </div>
        
        <div class="nav-section">
          <p class="nav-title">MANAGEMENT</p>
          <div class="nav-item" :class="{ active: currentRoute === 'files' }">
            <Icon name="mdi:file-cloud" />
            <span>File Storage</span>
          </div>
          <div class="nav-item" :class="{ active: currentRoute === 'notifications' }">
            <Icon name="mdi:bell" />
            <span>Notifications</span>
          </div>
          <div class="nav-item" :class="{ active: currentRoute === 'analytics' }">
            <Icon name="mdi:chart-bar" />
            <span>Analytics</span>
          </div>
        </div>
      </nav>

      <div class="user-profile">
        <!--<img src="/avatar-placeholder.jpg" alt="Admin" class="avatar" >-->
        <div class="user-info">
          <p class="user-name">Admin User</p>
          <p class="user-role">Administrator</p>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <header class="top-bar">
        <div class="search-container">
          <Icon name="mdi:magnify" />
          <input type="text" placeholder="Search..." class="search-input" >
        </div>

        <div class="action-buttons">
          <button class="notification-btn">
            <Icon name="mdi:bell-outline" />
            <span class="notification-indicator"/>
          </button>
          <button class="settings-btn">
            <Icon name="mdi:cog-outline" />
          </button>
        </div>
      </header>

      <div class="content-area">
        <slot/>
      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  currentRoute: {
    type: String,
    default: 'forms'
  }
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #121212;
  color: #e0e0e0;
}

.sidebar {
  width: 280px;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  border-right: 1px solid #333;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 0 12px;
}

.logo {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.logo-container h2 {
  font-weight: 600;
  font-size: 1.25rem;
  color: #fff;
}

.nav-menu {
  flex: 1;
}

.nav-section {
  margin-bottom: 24px;
}

.nav-title {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 8px;
  padding-left: 12px;
  letter-spacing: 0.8px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item i {
  margin-right: 12px;
  font-size: 1.25rem;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 16px 12px;
  border-top: 1px solid #333;
  margin-top: auto;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.user-name {
  font-weight: 500;
  font-size: 0.95rem;
}

.user-role {
  font-size: 0.8rem;
  color: #888;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-bar {
  height: 72px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #333;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #252525;
  padding: 8px 16px;
  border-radius: 8px;
  width: 320px;
}

.search-input {
  background: transparent;
  border: none;
  color: #e0e0e0;
  margin-left: 8px;
  width: 100%;
  outline: none;
}

.action-buttons {
  display: flex;
}

.notification-btn, .settings-btn {
  background: transparent;
  border: none;
  color: #e0e0e0;
  font-size: 1.25rem;
  padding: 8px;
  margin-left: 16px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
}

.notification-btn:hover, .settings-btn:hover {
  background-color: #252525;
}

.notification-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff4081;
}

.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>
<template>
  <div class="dashboard-page">
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <div class="page-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <div class="page-title">
            <h1>Dashboard</h1>
            <p>Overview of your infrastructure management system</p>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="welcome-card">
        <h2>Welcome to Moth Solutions Admin Console</h2>
        <p>Your comprehensive infrastructure management platform is ready to use.</p>
        <div class="quick-actions">
          <router-link to="/health-check" class="action-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Check System Health
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
.dashboard-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-icon {
  width: 3rem;
  height: 3rem;
  background-color: #EEF2FF;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4F46E5;
}

.page-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.page-title h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.page-title p {
  font-size: 1rem;
  color: #6B7280;
  margin: 0.25rem 0 0 0;
  font-family: 'Open Sans', sans-serif;
}

.dashboard-content {
  display: grid;
  gap: 2rem;
}

.welcome-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.welcome-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 1rem 0;
  font-family: 'Montserrat', sans-serif;
}

.welcome-card p {
  font-size: 1rem;
  color: #6B7280;
  margin: 0 0 2rem 0;
  font-family: 'Open Sans', sans-serif;
}

.quick-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4F46E5;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  font-family: 'Open Sans', sans-serif;
}

.action-btn:hover {
  background-color: #3730A3;
  transform: translateY(-1px);
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 1rem;
  }
  
  .page-title h1 {
    font-size: 1.5rem;
  }
  
  .quick-actions {
    flex-direction: column;
  }
}
</style>


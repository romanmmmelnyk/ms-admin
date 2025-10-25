<template>
  <div class="sidebar">
    <!-- Logo Section -->
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="/assets/moth icon.png" alt="Moth Solutions Logo" class="logo-icon" />
        <span class="brand-name">Admin Console</span>
      </div>
      <!-- Close Button for Mobile -->
      <button class="close-btn" @click="closeSidebar">
        <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <!-- OVERVIEW Section -->
      <div class="nav-section">
        <h3 class="section-label">OVERVIEW</h3>
        <div class="nav-item" :class="{ active: $route.path === '/dashboard' }" @click="navigateTo('/dashboard')">
          <div class="nav-item-content">
            <span class="nav-icon dashboard-icon">
              <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </span>
            <span class="nav-text">Dashboard</span>
          </div>
        </div>
        <div class="nav-item">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </span>
            <span class="nav-text">Analytics</span>
          </div>
        </div>
      </div>

      <!-- INFRASTRUCTURE Section -->
      <div class="nav-section">
        <h3 class="section-label">INFRASTRUCTURE</h3>
        <div class="nav-item" :class="{ active: $route.path === '/sites' }" @click="navigateTo('/sites')">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </span>
            <span class="nav-text">Sites</span>
          </div>
        </div>
        <div class="nav-item" :class="{ active: $route.path === '/instances' }" @click="navigateTo('/instances')">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </span>
            <span class="nav-text">Instances</span>
          </div>
        </div>
        <div class="nav-item" :class="{ active: $route.path === '/domains' }" @click="navigateTo('/domains')">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </span>
            <span class="nav-text">Domains</span>
          </div>
        </div>
        
        <div class="nav-item" :class="{ active: $route.path === '/ports' }" @click="navigateTo('/ports')">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </span>
            <span class="nav-text">Ports</span>
          </div>
        </div>
        <div class="nav-item" :class="{ active: $route.path === '/hosting' }" @click="navigateTo('/hosting')">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
              </svg>
            </span>
            <span class="nav-text">Hosting</span>
          </div>
        </div>
      </div>

      <!-- MANAGEMENT Section -->
      <div class="nav-section">
        <h3 class="section-label">MANAGEMENT</h3>
        <div class="nav-item">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </span>
            <span class="nav-text">Enquiries</span>
          </div>
        </div>
        <div class="nav-item">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>
              </svg>
            </span>
            <span class="nav-text">Billing</span>
          </div>
        </div>
        <div class="nav-item" :class="{ active: $route.path === '/health-check' }" @click="navigateTo('/health-check')">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </span>
            <span class="nav-text">Health Check</span>
          </div>
        </div>
      </div>

      <!-- SYSTEM Section -->
      <div class="nav-section">
        <h3 class="section-label">SYSTEM</h3>
        <div class="nav-item">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </span>
            <span class="nav-text">Settings</span>
          </div>
        </div>
        <div class="nav-item" :class="{ active: $route.path === '/documentation' }" @click="navigateTo('/documentation')">
          <div class="nav-item-content">
            <span class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </span>
            <span class="nav-text">Documentation</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    closeSidebar() {
      this.$emit('close-sidebar')
    },
    navigateTo(route) {
      this.$router.push(route)
      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768) {
        this.closeSidebar()
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 20rem;
  height: 100vh;
  background-color: #F8F9FA;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

/* Custom Scrollbar */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #4F46E5;
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background-color: #3730A3;
}

/* Firefox scrollbar */
.sidebar {
  scrollbar-width: thin;
  scrollbar-color: #4F46E5 transparent;
}

.sidebar-header {
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.close-btn {
  display: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: #f3f4f6;
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
}

.logo-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  object-fit: contain;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1F2937;
  font-family: 'Montserrat', sans-serif;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
}

.nav-section {
  margin-bottom: 3rem;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
  font-family: 'Open Sans', sans-serif;
}

.nav-group {
  margin-bottom: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  margin: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  font-family: 'Open Sans', sans-serif;
}

.nav-item:hover {
  background-color: #F3F4F6;
  transform: translateX(2px);
}

.nav-item.active {
  background-color: #dbeafe;
  color: #4F46E5;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.15);
  transform: translateX(4px);
}

.nav-item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item.active .nav-icon {
  color: #4F46E5;
}

.nav-item.active .nav-icon.dashboard-icon {
  color: #4F46E5;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: inherit;
  font-family: 'Montserrat', sans-serif;
}

.nav-chevron {
  width: 1.25rem;
  height: 1.25rem;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-chevron svg {
  width: 100%;
  height: 100%;
}

.nav-subitems {
  padding-left: 3rem;
}

.nav-subitem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  font-family: 'Open Sans', sans-serif;
}

.nav-subitem:hover {
  background-color: #F3F4F6;
  transform: translateX(2px);
}

.nav-subitem.active {
  background-color: #dbeafe;
  color: #4F46E5;
  box-shadow: 0 1px 6px rgba(79, 70, 229, 0.12);
  transform: translateX(3px);
}

.subitem-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: inherit;
  font-family: 'Montserrat', sans-serif;
}

.badge {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #EEF2FF;
  color: #4F46E5;
  margin-left: 0.5rem;
  font-family: 'Open Sans', sans-serif;
}

.badge.new {
  background-color: #EEF2FF;
  color: #4F46E5;
}

.badge.pro {
  background-color: #EEF2FF;
  color: #4F46E5;
}

/* Responsive Sidebar */
@media (max-width: 1024px) {
  .sidebar {
    width: 20rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .close-btn {
    display: flex;
  }
  
  .sidebar-header {
    padding: 1.25rem 1.25rem;
  }
  
  .nav-item {
    padding: 1rem 1.25rem;
    margin: 0.5rem 1rem;
  }
  
  .nav-subitem {
    padding: 0.75rem 1.25rem;
    margin: 0.25rem 1rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 20rem;
  }
  
  .sidebar-header {
    padding: 1rem 1rem;
  }
  
  .brand-name {
    font-size: 1.125rem;
  }
  
  .logo-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .nav-item {
    padding: 0.875rem 1rem;
    margin: 0.375rem 0.75rem;
  }
  
  .nav-subitem {
    padding: 0.625rem 1rem;
    margin: 0.25rem 0.75rem;
  }
  
  .nav-text {
    font-size: 0.875rem;
  }
  
  .subitem-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 640px) {
  .sidebar {
    width: 20rem;
  }
  
  .sidebar-header {
    padding: 0.875rem 0.875rem;
  }
  
  .brand-name {
    font-size: 1rem;
  }
  
  .logo-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .nav-item {
    padding: 0.75rem 0.875rem;
    margin: 0.25rem 0.5rem;
  }
  
  .nav-subitem {
    padding: 0.5rem 0.875rem;
    margin: 0.125rem 0.5rem;
  }
  
  .nav-text {
    font-size: 0.8rem;
  }
  
  .subitem-text {
    font-size: 0.75rem;
  }
  
  .section-label {
    font-size: 0.7rem;
    padding: 0 0.875rem;
  }
}
</style>

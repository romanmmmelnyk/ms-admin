<template>
  <header class="top-header">
    <div class="header-content">
      <!-- Left Section - Hamburger Menu -->
      <div class="header-left">
        <button class="hamburger-btn" @click="toggleSidebar">
          <svg class="hamburger-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Center Section - Empty -->
      <div class="header-center">
      </div>

      <!-- Right Section - Database Status & User Profile -->
      <div class="header-right">
        <!-- Database Status Indicator -->
        <div class="database-status-container" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" @click="toggleTooltip">
          <div class="database-status" :class="{ 'status-online': isBackendOnline, 'status-offline': !isBackendOnline }">
            <svg class="database-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"></path>
              <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"></path>
            </svg>
          </div>
          <!-- Live indicator dot -->
          <div class="live-indicator" :class="{ 'live-online': isBackendOnline, 'live-offline': !isBackendOnline }"></div>
          
          <!-- Tooltip -->
          <div class="status-tooltip" :class="{ 'tooltip-visible': showTooltip }">
            <div class="tooltip-content">
              <div class="tooltip-header">
                <span class="tooltip-title">Backend Status</span>
                <span class="tooltip-status" :class="{ 'status-online': isBackendOnline, 'status-offline': !isBackendOnline }">
                  {{ isBackendOnline ? 'Online' : 'Offline' }}
                </span>
              </div>
              <div class="tooltip-details">
                <div class="tooltip-item">
                  <span class="tooltip-label">Last Check:</span>
                  <span class="tooltip-value">{{ lastCheckTime }}</span>
                </div>
                <div class="tooltip-item">
                  <span class="tooltip-label">Update Interval:</span>
                  <span class="tooltip-value">15 seconds</span>
                </div>
                <div class="tooltip-item">
                  <span class="tooltip-label">Endpoint:</span>
                  <span class="tooltip-value">/health</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- User Profile -->
        <div class="user-profile" @click="toggleUserMenu">
          <div class="user-avatar">
            <img src="/assets/avatar.jpg" alt="User Avatar" />
          </div>
          <span class="user-name">{{ currentUser?.name || 'Roman' }}</span>
          <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
          
          <!-- User Menu Dropdown -->
          <div class="user-menu" :class="{ 'menu-visible': showUserMenu }">
            <div class="menu-item" @click="logout">
              <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import api from '../services/api.js'
import { authService } from '../services/auth.js'

export default {
  name: 'TopHeader',
  data() {
    return {
      isBackendOnline: false,
      statusCheckInterval: null,
      showTooltip: false,
      lastCheckTime: 'Never',
      showUserMenu: false
    }
  },
  async mounted() {
    await this.checkBackendStatus()
    // Check backend status every 15 seconds
    this.statusCheckInterval = setInterval(this.checkBackendStatus, 15000)
    
    // Add click outside handler for user menu
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval)
    }
    document.removeEventListener('click', this.handleClickOutside)
  },
  computed: {
    currentUser() {
      return authService.getCurrentUser()
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar')
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    logout() {
      authService.logout()
      this.$router.push('/login')
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showUserMenu = false
      }
    },
    toggleTooltip() {
      // For mobile devices - toggle tooltip on tap
      if (window.innerWidth <= 768) {
        this.showTooltip = !this.showTooltip
      }
    },
    async checkBackendStatus() {
      try {
        // Use the existing health check method
        const result = await api.checkHealth()
        this.isBackendOnline = result.status === 'success'
        this.lastCheckTime = new Date().toLocaleTimeString()
      } catch (error) {
        this.isBackendOnline = false
        this.lastCheckTime = new Date().toLocaleTimeString()
      }
    }
  }
}
</script>

<style scoped>
.top-header {
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
}

/* Responsive Header */
@media (max-width: 1024px) {
  .top-header {
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 768px) {
  .top-header {
    padding: 0.5rem 1rem;
  }
  
  .hamburger-btn {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .user-name {
    font-size: 0.875rem;
  }
  
  .user-avatar {
    width: 2rem;
    height: 2rem;
  }
}

@media (max-width: 640px) {
  .header-left {
    gap: 0.75rem;
  }
  
  .user-profile {
    padding: 0.125rem 0.375rem;
  }
  
  .user-name {
    font-size: 0.8rem;
  }
  
  .database-status {
    width: 2rem;
    height: 2rem;
  }
  
  .database-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .live-indicator {
    width: 0.5rem;
    height: 0.5rem;
    top: -0.125rem;
    right: -0.125rem;
  }
  
  /* Mobile tooltip positioning - center on icon */
  .status-tooltip {
    right: -5rem !important; /* Move tooltip further to the right */
    transform: translateY(-0.75rem) scale(0.95) !important;
  }
  
  .status-tooltip.tooltip-visible {
    transform: translateY(0) scale(1) !important;
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hamburger-btn {
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.hamburger-btn:hover {
  background-color: #f3f4f6;
}

.hamburger-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #374151;
}

.header-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: all 0.2s;
  min-width: 24rem;
}

.search-container:focus-within {
  background-color: white;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  font-family: 'Open Sans', sans-serif;
}

.search-input::placeholder {
  color: #9ca3af;
  font-weight: 600;
}

.keyboard-shortcut {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #f3f4f6;
  border: none;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  cursor: pointer;
  transition: background-color 0.2s;
}

.keyboard-shortcut:hover {
  background-color: #e5e7eb;
}

.cmd-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.shortcut-text {
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Database Status Indicator */
.database-status-container {
  position: relative;
  display: flex;
  align-items: center;
}

.database-status {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

/* Live indicator dot */
.live-indicator {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 2px solid white;
  transition: all 0.3s ease;
}

.live-indicator.live-online {
  background-color: #22c55e;
}

.live-indicator.live-offline {
  background-color: #ef4444;
}

/* Status Tooltip */
.status-tooltip {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.75rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border: 2px solid #10b981;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.75rem) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  min-width: 14rem;
  backdrop-filter: blur(10px);
}

.status-tooltip.tooltip-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.tooltip-content {
  padding: 1rem;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f1f5f9;
}

.tooltip-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.025em;
}

.tooltip-status {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.tooltip-status.status-online {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.tooltip-status.status-offline {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

.tooltip-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tooltip-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.tooltip-item:hover {
  background-color: rgba(148, 163, 184, 0.1);
}

.tooltip-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.tooltip-value {
  font-size: 0.85rem;
  color: #1e293b;
  font-weight: 600;
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
  background-color: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
}

.database-status.status-online {
  background-color: #a7f3d0;
  color: #1f8e70;
}

.database-status.status-offline {
  background-color: #fecaca;
  color: #dc2626;
}

.database-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}


.utility-btn {
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.utility-btn:hover {
  background-color: #f3f4f6;
}

.utility-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #374151;
}

.notification-btn {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: #f97316;
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 0.75rem;
  min-width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.user-profile:hover {
  background-color: #f3f4f6;
}

/* User Menu Dropdown */
.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  min-width: 12rem;
}

.user-menu.menu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: #f8fafc;
  color: #dc2626;
}

.menu-icon {
  width: 1rem;
  height: 1rem;
  stroke-width: 2;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  font-family: 'Open Sans', sans-serif;
}

.dropdown-icon {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

/* Toggle Switch Styles */
.toggle-container {
  cursor: pointer;
}

.toggle-switch {
  width: 2.75rem;
  height: 1.375rem;
  position: relative;
}

.toggle-track {
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.6875rem;
  position: relative;
  transition: all 0.2s ease;
  overflow: hidden;
}

.toggle-switch.active .toggle-track {
  background-color: #3b82f6;
  border-color: #2563eb;
}

.toggle-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.1875rem;
  pointer-events: none;
}

.toggle-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: white;
  transition: opacity 0.2s ease;
}

.moon-icon {
  opacity: 1;
}

.sun-icon {
  opacity: 0;
}

.toggle-switch.active .moon-icon {
  opacity: 0;
}

.toggle-switch.active .sun-icon {
  opacity: 1;
}

.toggle-thumb {
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.125rem;
  height: 1.125rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.toggle-switch.active .toggle-thumb {
  transform: translateX(1.375rem);
}
</style>

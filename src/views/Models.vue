<template>
  <div class="models-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <div class="page-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
          </div>
          <div class="page-title">
            <h1>Models Management</h1>
            <p>Comprehensive admin panel for managing all models service data</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Health Check Section -->
    <HealthCheckCard />

    <!-- Management Tabs -->
    <div class="management-section">
      <div class="tabs-container">
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['tab-button', { active: activeTab === tab.id }]"
          >
            <svg v-if="tab.icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon"></path>
            </svg>
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import HealthCheckCard from '../components/models/HealthCheckCard.vue'
import UsersSection from '../components/models/sections/UsersSection.vue'
import WebsitesSection from '../components/models/sections/WebsitesSection.vue'
import BillingSection from '../components/models/sections/BillingSection.vue'
import ApplicationsSection from '../components/models/sections/ApplicationsSection.vue'
import BookingsSection from '../components/models/sections/BookingsSection.vue'
import MediaSection from '../components/models/sections/MediaSection.vue'
import TemplatesSection from '../components/models/sections/TemplatesSection.vue'

export default {
  name: 'Models',
  components: {
    HealthCheckCard,
    UsersSection,
    WebsitesSection,
    BillingSection,
    ApplicationsSection,
    BookingsSection,
    MediaSection,
    TemplatesSection
  },
  data() {
    return {
      activeTab: 'users',
      tabs: [
        { id: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { id: 'websites', label: 'Websites', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { id: 'billing', label: 'Billing', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
        { id: 'applications', label: 'Applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { id: 'media', label: 'Media', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { id: 'templates', label: 'Templates', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
      ]
    }
  },
  computed: {
    currentComponent() {
      const map = {
        users: 'UsersSection',
        websites: 'WebsitesSection',
        billing: 'BillingSection',
        applications: 'ApplicationsSection',
        bookings: 'BookingsSection',
        media: 'MediaSection',
        templates: 'TemplatesSection'
      }
      return map[this.activeTab] || 'UsersSection'
    }
  }
}
</script>

<style scoped>
.models-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Page Header */
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

/* Management Section */
.management-section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Tabs */
.tabs-container {
  background: white;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: #6B7280;
  transition: all 0.2s;
  font-family: 'Open Sans', sans-serif;
  white-space: nowrap;
  font-size: 0.875rem;
}

.tab-button svg {
  width: 1rem;
  height: 1rem;
}

.tab-button:hover {
  background-color: #F3F4F6;
  color: #4F46E5;
}

.tab-button.active {
  background-color: #EEF2FF;
  color: #4F46E5;
  font-weight: 600;
}

/* Tab Content */
.tab-content {
  background: white;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  padding: 2rem;
}

.coming-soon {
  text-align: center;
  padding: 3rem;
  color: #6B7280;
  font-family: 'Open Sans', sans-serif;
}

/* Responsive */
@media (max-width: 768px) {
  .models-page {
    padding: 1rem;
  }
  
  .tabs {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
  
  .tab-content {
    padding: 1rem;
  }
}
</style>
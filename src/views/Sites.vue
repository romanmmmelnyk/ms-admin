<template>
  <div class="sites-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <div class="page-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div class="page-title">
            <h1>Sites</h1>
            <p>Manage your web sites and their configurations</p>
          </div>
        </div>
        <div class="header-right">
          <button @click="showCreateModal = true" class="create-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create Site
          </button>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="filters-section">
      <div class="filters-content">
        <div class="search-box">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search sites..."
            class="search-input"
            @input="debouncedSearch"
          />
        </div>
        
        <div class="filter-controls">
          <select v-model="statusFilter" @change="applyFilters" class="filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          
          <select v-model="instanceFilter" @change="applyFilters" class="filter-select">
            <option value="">All Instances</option>
            <option v-for="instance in instances" :key="instance.id" :value="instance.id">
              {{ instance.name }}
            </option>
          </select>
          
          <button @click="clearFilters" class="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Sites Table -->
    <div class="sites-table-container">
      <div class="table-header">
        <h2>Sites ({{ filteredSites.length }})</h2>
        <div class="table-actions">
          <button @click="refreshSites" :disabled="isLoading" class="refresh-btn">
            <svg :class="{ spinning: isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {{ isLoading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading sites...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <div class="error-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3>Error Loading Sites</h3>
        <p>{{ error }}</p>
        <button @click="refreshSites" class="retry-btn">Try Again</button>
      </div>

      <div v-else-if="filteredSites.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h3>No Sites Found</h3>
        <p v-if="hasActiveFilters">Try adjusting your filters or search terms.</p>
        <p v-else>Get started by creating your first site.</p>
        <button v-if="!hasActiveFilters" @click="showCreateModal = true" class="create-first-btn">
          Create Your First Site
        </button>
      </div>

      <div v-else class="sites-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Instance</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="site in paginatedSites" :key="site.id" class="site-row">
              <td class="site-name">
                <div class="name-content">
                  <span class="name">{{ site.name }}</span>
                  <span class="description">{{ site.description || 'No description' }}</span>
                </div>
              </td>
              <td class="site-domain">
                <span class="domain">{{ site.domain || 'No domain' }}</span>
              </td>
              <td class="site-instance">
                <span class="instance">{{ getInstanceName(site.instanceId) }}</span>
              </td>
              <td class="site-status">
                <span class="status-badge" :class="site.status">
                  {{ site.status }}
                </span>
              </td>
              <td class="site-created">
                <span class="created">{{ formatDate(site.createdAt) }}</span>
              </td>
              <td class="site-actions">
                <div class="action-buttons">
                  <button @click="viewSite(site)" class="action-btn view" title="View Details">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click="editSite(site)" class="action-btn edit" title="Edit Site">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="deleteSite(site)" class="action-btn delete" title="Delete Site">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="page-btn"
        >
          Previous
        </button>
        
        <div class="page-numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="{ active: page === currentPage }"
            class="page-number"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="page-btn"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create Site Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="modal-title">
            <div class="modal-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div class="title-content">
              <h2>Create New Site</h2>
              <p>Add a new site to your infrastructure</p>
            </div>
          </div>
          <button @click="closeModal" class="close-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="createSite" class="modal-form">
          <div class="form-section">
            <div class="form-grid">
              <div class="form-group">
                <label for="siteName" class="form-label">
                  <span class="label-text">Site Name</span>
                  <span class="required">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    id="siteName"
                    v-model="newSite.name"
                    type="text"
                    required
                    placeholder="Enter site name"
                    class="form-input"
                  />
                  <div class="input-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="siteDomain" class="form-label">
                  <span class="label-text">Domain</span>
                </label>
                <div class="input-wrapper">
                  <input
                    id="siteDomain"
                    v-model="newSite.domain"
                    type="text"
                    placeholder="example.com"
                    class="form-input"
                  />
                  <div class="input-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="siteDescription" class="form-label">
                <span class="label-text">Description</span>
              </label>
              <div class="textarea-wrapper">
                <textarea
                  id="siteDescription"
                  v-model="newSite.description"
                  placeholder="Describe your site..."
                  class="form-textarea"
                  rows="3"
                ></textarea>
                <div class="textarea-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Configuration</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="siteInstance" class="form-label">
                  <span class="label-text">Instance</span>
                  <span class="required">*</span>
                </label>
                <div class="select-wrapper">
                  <select
                    id="siteInstance"
                    v-model="newSite.instanceId"
                    required
                    class="form-select"
                  >
                    <option value="">Select an instance</option>
                    <option v-for="instance in instances" :key="instance.id" :value="instance.id">
                      {{ instance.name }} ({{ instance.ipAddress }})
                    </option>
                  </select>
                  <div class="select-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="siteStatus" class="form-label">
                  <span class="label-text">Status</span>
                </label>
                <div class="select-wrapper">
                  <select
                    id="siteStatus"
                    v-model="newSite.status"
                    class="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <div class="select-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeModal" class="cancel-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Cancel
            </button>
            <button type="submit" :disabled="isCreating" class="submit-btn">
              <svg v-if="!isCreating" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <svg v-else class="spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ isCreating ? 'Creating...' : 'Create Site' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.js'

export default {
  name: 'Sites',
  data() {
    return {
      sites: [],
      instances: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      statusFilter: '',
      instanceFilter: '',
      currentPage: 1,
      itemsPerPage: 10,
      showCreateModal: false,
      isCreating: false,
      newSite: {
        name: '',
        description: '',
        domain: '',
        instanceId: '',
        status: 'active'
      },
      searchTimeout: null
    }
  },
  computed: {
    filteredSites() {
      let filtered = this.sites

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(site => 
          site.name.toLowerCase().includes(query) ||
          (site.domain && site.domain.toLowerCase().includes(query)) ||
          (site.description && site.description.toLowerCase().includes(query))
        )
      }

      // Apply status filter
      if (this.statusFilter) {
        filtered = filtered.filter(site => site.status === this.statusFilter)
      }

      // Apply instance filter
      if (this.instanceFilter) {
        filtered = filtered.filter(site => site.instanceId === this.instanceFilter)
      }

      return filtered
    },
    paginatedSites() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredSites.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredSites.length / this.itemsPerPage)
    },
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    },
    hasActiveFilters() {
      return this.searchQuery || this.statusFilter || this.instanceFilter
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      await Promise.all([
        this.loadSites(),
        this.loadInstances()
      ])
    },
    async loadSites() {
      this.isLoading = true
      this.error = null
      
      try {
        this.sites = await apiService.getSites()
      } catch (error) {
        this.error = error.message
        console.error('Error loading sites:', error)
      } finally {
        this.isLoading = false
      }
    },
    async loadInstances() {
      try {
        this.instances = await apiService.getInstances()
      } catch (error) {
        console.error('Error loading instances:', error)
      }
    },
    async refreshSites() {
      await this.loadSites()
    },
    debouncedSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1
      }, 300)
    },
    applyFilters() {
      this.currentPage = 1
    },
    clearFilters() {
      this.searchQuery = ''
      this.statusFilter = ''
      this.instanceFilter = ''
      this.currentPage = 1
    },
    getInstanceName(instanceId) {
      const instance = this.instances.find(i => i.id === instanceId)
      return instance ? instance.name : 'Unknown'
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    viewSite(site) {
      // TODO: Implement site details view
      console.log('View site:', site)
    },
    editSite(site) {
      // TODO: Implement site editing
      console.log('Edit site:', site)
    },
    async deleteSite(site) {
      if (confirm(`Are you sure you want to delete "${site.name}"?`)) {
        try {
          await apiService.deleteSite(site.id)
          await this.loadSites()
        } catch (error) {
          alert('Error deleting site: ' + error.message)
        }
      }
    },
    async createSite() {
      this.isCreating = true
      
      try {
        await apiService.createSite(this.newSite)
        this.closeModal()
        await this.loadSites()
      } catch (error) {
        alert('Error creating site: ' + error.message)
      } finally {
        this.isCreating = false
      }
    },
    closeModal() {
      this.showCreateModal = false
      this.newSite = {
        name: '',
        description: '',
        domain: '',
        instanceId: '',
        status: 'active'
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.sites-page {
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

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4F46E5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
}

.create-btn:hover {
  background-color: #3730A3;
  transform: translateY(-1px);
}

.create-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Filters Section */
.filters-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filters-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #6B7280;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
}

.search-input:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  background: white;
}

.clear-filters-btn {
  padding: 0.75rem 1rem;
  background-color: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Open Sans', sans-serif;
}

.clear-filters-btn:hover {
  background-color: #E5E7EB;
}

/* Sites Table */
.sites-table-container {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #E5E7EB;
}

.table-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #E5E7EB;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Loading, Error, Empty States */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #E5E7EB;
  border-top: 2px solid #4F46E5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-icon,
.empty-icon {
  width: 4rem;
  height: 4rem;
  background-color: #FEE2E2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #DC2626;
  margin-bottom: 1rem;
}

.empty-icon {
  background-color: #F3F4F6;
  color: #6B7280;
}

.error-icon svg,
.empty-icon svg {
  width: 2rem;
  height: 2rem;
}

.loading-state h3,
.error-state h3,
.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 0.5rem 0;
  font-family: 'Montserrat', sans-serif;
}

.loading-state p,
.error-state p,
.empty-state p {
  font-size: 1rem;
  color: #6B7280;
  margin: 0 0 1.5rem 0;
  font-family: 'Open Sans', sans-serif;
}

.retry-btn,
.create-first-btn {
  background-color: #4F46E5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
}

.retry-btn:hover,
.create-first-btn:hover {
  background-color: #3730A3;
}

/* Sites Table */
.sites-table {
  overflow-x: auto;
}

.sites-table table {
  width: 100%;
  border-collapse: collapse;
}

.sites-table th {
  background-color: #F9FAFB;
  padding: 1rem 2rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #E5E7EB;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
}

.sites-table td {
  padding: 1rem 2rem;
  border-bottom: 1px solid #F3F4F6;
  font-family: 'Open Sans', sans-serif;
}

.site-row:hover {
  background-color: #F9FAFB;
}

.site-name .name-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.site-name .name {
  font-weight: 600;
  color: #1F2937;
  font-size: 1rem;
}

.site-name .description {
  font-size: 0.875rem;
  color: #6B7280;
}

.site-domain .domain {
  font-weight: 500;
  color: #1F2937;
}

.site-instance .instance {
  color: #374151;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
}

.status-badge.active {
  background-color: #D1FAE5;
  color: #065F46;
}

.status-badge.inactive {
  background-color: #F3F4F6;
  color: #374151;
}

.status-badge.suspended {
  background-color: #FEE2E2;
  color: #991B1B;
}

.site-created .created {
  color: #6B7280;
  font-size: 0.875rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.action-btn.view {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.action-btn.view:hover {
  background-color: #BFDBFE;
}

.action-btn.edit {
  background-color: #FEF3C7;
  color: #D97706;
}

.action-btn.edit:hover {
  background-color: #FDE68A;
}

.action-btn.delete {
  background-color: #FEE2E2;
  color: #DC2626;
}

.action-btn.delete:hover {
  background-color: #FECACA;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #E5E7EB;
}

.page-btn {
  padding: 0.5rem 1rem;
  background-color: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Open Sans', sans-serif;
}

.page-btn:hover:not(:disabled) {
  background-color: #E5E7EB;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-number {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Open Sans', sans-serif;
}

.page-number:hover {
  background-color: #E5E7EB;
}

.page-number.active {
  background-color: #4F46E5;
  color: white;
  border-color: #4F46E5;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: white;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 750px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease-out;
  padding-top: 5px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem 2rem 1rem 2rem;
  border-bottom: 1px solid #F3F4F6;
  width: 100%;
  box-sizing: border-box;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.modal-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.title-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.title-content p {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0.25rem 0 0 0;
  font-family: 'Open Sans', sans-serif;
}

.close-btn {
  width: 2.5rem;
  height: 2.5rem;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #F3F4F6;
  color: #374151;
}

.close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-form {
  padding: 15px 2rem 1.75rem 2rem;
  box-sizing: border-box;
  width: 100%;
}

.form-section {
  margin-bottom: 1.75rem;
}

.form-section:last-of-type {
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1.25rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #F3F4F6;
  font-family: 'Montserrat', sans-serif;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  width: 100%;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 1.25rem;
  width: 100%;
  box-sizing: border-box;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.625rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
}

.label-text {
  color: #374151;
}

.required {
  color: #EF4444;
  font-weight: 700;
}

.input-wrapper,
.textarea-wrapper,
.select-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  transition: all 0.2s;
  background-color: #FAFAFA;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #4F46E5;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 90px;
  padding-top: 0.875rem;
}

.input-icon,
.textarea-icon,
.select-icon {
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #9CA3AF;
  pointer-events: none;
}

.textarea-icon {
  top: 1.25rem;
  transform: none;
}

.form-select {
  appearance: none;
  background-image: none;
  cursor: pointer;
}

.select-icon {
  right: 0.875rem;
  left: auto;
  pointer-events: none;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #F3F4F6;
  width: 100%;
  box-sizing: border-box;
}

.cancel-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background-color: #F9FAFB;
  color: #6B7280;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Montserrat', sans-serif;
}

.cancel-btn:hover {
  background-color: #F3F4F6;
  color: #374151;
  border-color: #D1D5DB;
}

.cancel-btn svg {
  width: 1rem;
  height: 1rem;
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
    border-radius: 1rem;
    max-width: none;
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }
  
  .modal-form {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .cancel-btn,
  .submit-btn {
    justify-content: center;
    width: 100%;
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    padding: 0.875rem 1rem 0.875rem 2.5rem;
  }
  
  .input-icon,
  .textarea-icon,
  .select-icon {
    left: 0.75rem;
  }
  
  .select-icon {
    right: 0.75rem;
  }
}

/* Animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinning {
  animation: spin 1s linear infinite;
}

/* Additional Responsive Styles */
@media (max-width: 768px) {
  .sites-page {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .page-title h1 {
    font-size: 1.5rem;
  }
  
  .filters-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .filter-controls {
    flex-wrap: wrap;
  }
  
  .sites-table {
    font-size: 0.875rem;
  }
  
  .sites-table th,
  .sites-table td {
    padding: 0.75rem 1rem;
  }
}
</style>

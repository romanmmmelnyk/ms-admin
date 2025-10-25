<template>
  <div class="hosting-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <div class="page-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
          </div>
          <div class="page-title">
            <h1>Hosting</h1>
            <p>Manage your hosting providers and their configurations</p>
          </div>
        </div>
        <div class="header-right">
          <button @click="showCreateModal = true" class="create-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create Hosting
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
            placeholder="Search hosting providers..."
            class="search-input"
            @input="debouncedSearch"
          />
        </div>
        
        <div class="filter-controls">
          <select v-model="providerFilter" @change="applyFilters" class="filter-select">
            <option value="">All Providers</option>
            <option value="aws">AWS</option>
            <option value="digitalocean">DigitalOcean</option>
            <option value="linode">Linode</option>
            <option value="vultr">Vultr</option>
            <option value="google-cloud">Google Cloud</option>
            <option value="azure">Azure</option>
          </select>
          
          <button @click="clearFilters" class="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Hosting Table -->
    <div class="hosting-table-container">
      <div class="table-header">
        <h2>Hosting Providers ({{ filteredHostings.length }})</h2>
        <div class="table-actions">
          <button @click="refreshHostings" :disabled="isLoading" class="refresh-btn">
            <svg :class="{ spinning: isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {{ isLoading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading hosting providers...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <div class="error-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3>Error Loading Hosting Providers</h3>
        <p>{{ error }}</p>
        <button @click="refreshHostings" class="retry-btn">Try Again</button>
      </div>

      <div v-else-if="filteredHostings.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
          </svg>
        </div>
        <h3>No Hosting Providers Found</h3>
        <p>Get started by adding your first hosting provider</p>
        <button @click="showCreateModal = true" class="create-first-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Create Your First Hosting Provider
        </button>
      </div>

      <div v-else class="hosting-table">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Account</th>
              <th>Annual Cost</th>
              <th>Instances</th>
              <th>Last Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hosting in paginatedHostings" :key="hosting.id" class="hosting-row">
              <td class="hosting-provider">
                <div class="provider-content">
                  <div class="provider-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                  </div>
                  <div class="provider-info">
                    <span class="provider-name">{{ hosting.providerName }}</span>
                  </div>
                </div>
              </td>
              <td class="hosting-account">
                <span class="account">{{ hosting.providerAccount }}</span>
              </td>
              <td class="hosting-cost">
                <span class="cost">{{ formatPrice(hosting.priceYear, hosting.currency) }}</span>
              </td>
              <td class="hosting-instances">
                <span class="instances-count">{{ hosting.instanceCount || 0 }} instances</span>
              </td>
              <td class="hosting-paid">
                <span class="paid-date">{{ formatDate(hosting.paidAt) }}</span>
              </td>
              <td class="hosting-actions">
                <div class="action-buttons">
                  <button @click="viewHosting(hosting)" class="action-btn view-btn" title="View Details">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click="editHosting(hosting)" class="action-btn edit-btn" title="Edit Hosting">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="deleteHosting(hosting)" class="action-btn delete-btn" title="Delete Hosting">
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
          class="pagination-btn"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <div class="pagination-pages">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="['pagination-page', { active: page === currentPage }]"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Create Hosting Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="modal-title">
            <div class="modal-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
              </svg>
            </div>
            <div class="title-content">
              <h2>Create New Hosting Provider</h2>
              <p>Add a new hosting provider to your infrastructure</p>
            </div>
          </div>
          <button @click="closeModal" class="close-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="createHosting" class="modal-form">
          <div class="form-section">
            <div class="form-grid">
              <div class="form-group">
                <label for="providerName" class="form-label">
                  <span class="label-text">Provider Name</span>
                  <span class="required">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    id="providerName"
                    v-model="newHosting.providerName"
                    type="text"
                    required
                    placeholder="AWS, DigitalOcean, Linode..."
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
                <label for="providerAccount" class="form-label">
                  <span class="label-text">Account ID</span>
                  <span class="required">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    id="providerAccount"
                    v-model="newHosting.providerAccount"
                    type="text"
                    required
                    placeholder="Account identifier or email"
                    class="form-input"
                  />
                  <div class="input-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label for="priceYear" class="form-label">
                  <span class="label-text">Annual Cost</span>
                </label>
                <div class="input-wrapper">
                  <input
                    id="priceYear"
                    v-model.number="newHosting.priceYear"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="120.00"
                    class="form-input"
                  />
                  <div class="input-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="currency" class="form-label">
                  <span class="label-text">Currency</span>
                </label>
                <div class="select-wrapper">
                  <select
                    id="currency"
                    v-model="newHosting.currency"
                    class="form-select"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                  </select>
                  <div class="select-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="paidAt" class="form-label">
                <span class="label-text">Last Paid Date</span>
              </label>
              <div class="input-wrapper">
                <input
                  id="paidAt"
                  v-model="newHosting.paidAt"
                  type="date"
                  class="form-input"
                />
                <div class="input-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
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
              {{ isCreating ? 'Creating...' : 'Create Hosting Provider' }}
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
  name: 'Hosting',
  data() {
    return {
      hostings: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      providerFilter: '',
      currentPage: 1,
      itemsPerPage: 10,
      showCreateModal: false,
      isCreating: false,
      newHosting: {
        providerName: '',
        providerAccount: '',
        priceYear: null,
        currency: 'USD',
        paidAt: ''
      },
      searchTimeout: null
    }
  },
  computed: {
    filteredHostings() {
      let filtered = this.hostings

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(hosting =>
          hosting.providerName.toLowerCase().includes(query) ||
          hosting.providerAccount.toLowerCase().includes(query)
        )
      }

      // Apply provider filter
      if (this.providerFilter) {
        filtered = filtered.filter(hosting => 
          hosting.providerName.toLowerCase() === this.providerFilter
        )
      }

      return filtered
    },
    paginatedHostings() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredHostings.slice(start, start + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.filteredHostings.length / this.itemsPerPage)
    },
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  async mounted() {
    await this.loadHostings()
  },
  methods: {
    async loadHostings() {
      this.isLoading = true
      this.error = null
      
      try {
        this.hostings = await apiService.getHostings()
      } catch (error) {
        this.error = error.message
        console.error('Error loading hostings:', error)
      } finally {
        this.isLoading = false
      }
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
      this.providerFilter = ''
      this.currentPage = 1
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString()
    },
    formatPrice(price, currency = 'USD') {
      if (!price) return 'N/A'
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(price)
    },
    viewHosting(hosting) {
      // TODO: Implement hosting details view
      console.log('View hosting:', hosting)
    },
    editHosting(hosting) {
      // TODO: Implement hosting editing
      console.log('Edit hosting:', hosting)
    },
    async deleteHosting(hosting) {
      if (confirm(`Are you sure you want to delete "${hosting.providerName}"?`)) {
        try {
          await apiService.deleteHosting(hosting.id)
          await this.loadHostings()
        } catch (error) {
          alert('Error deleting hosting provider: ' + error.message)
        }
      }
    },
    async createHosting() {
      this.isCreating = true
      
      try {
        await apiService.createHosting(this.newHosting)
        await this.loadHostings()
        this.closeModal()
      } catch (error) {
        alert('Error creating hosting provider: ' + error.message)
      } finally {
        this.isCreating = false
      }
    },
    closeModal() {
      this.showCreateModal = false
      this.newHosting = {
        providerName: '',
        providerAccount: '',
        priceYear: null,
        currency: 'USD',
        paidAt: ''
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.hosting-page {
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

/* Error, Loading, and Empty States */
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-state {
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
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  color: #EF4444;
}

.empty-icon {
  color: #9CA3AF;
}

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.retry-btn:hover,
.create-first-btn:hover {
  background-color: #3730A3;
  transform: translateY(-1px);
}

.retry-btn svg,
.create-first-btn svg {
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

/* Hosting Table */
.hosting-table-container {
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

.table-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  font-size: 0.875rem;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #E5E7EB;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 1rem;
  height: 1rem;
}

.hosting-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #F9FAFB;
}

th {
  padding: 1rem 2rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #E5E7EB;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Montserrat', sans-serif;
}

td {
  padding: 1rem 2rem;
  border-bottom: 1px solid #F3F4F6;
}

.hosting-row:hover {
  background-color: #F9FAFB;
}

.hosting-provider {
  width: 200px;
}

.provider-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.provider-icon {
  width: 2rem;
  height: 2rem;
  background-color: #EEF2FF;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4F46E5;
  flex-shrink: 0;
}

.provider-icon svg {
  width: 1rem;
  height: 1rem;
}

.provider-name {
  font-weight: 600;
  color: #1F2937;
  font-size: 0.95rem;
}

.hosting-account {
  width: 150px;
}

.account {
  color: #6B7280;
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
}

.hosting-cost {
  width: 120px;
}

.cost {
  font-weight: 600;
  color: #059669;
  font-size: 0.95rem;
}

.hosting-instances {
  width: 120px;
}

.instances-count {
  color: #6B7280;
  font-size: 0.875rem;
}

.hosting-paid {
  width: 120px;
}

.paid-date {
  color: #6B7280;
  font-size: 0.875rem;
}

.hosting-actions {
  width: 120px;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn {
  background-color: #E0E7FF;
  color: #3730A3;
}

.view-btn:hover {
  background-color: #C7D2FE;
}

.edit-btn {
  background-color: #FEF3C7;
  color: #D97706;
}

.edit-btn:hover {
  background-color: #FDE68A;
}

.delete-btn {
  background-color: #FEE2E2;
  color: #DC2626;
}

.delete-btn:hover {
  background-color: #FECACA;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border-top: 1px solid #E5E7EB;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #D1D5DB;
  background: white;
  color: #374151;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #F3F4F6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 0.25rem;
}

.pagination-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #D1D5DB;
  background: white;
  color: #374151;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.pagination-page:hover {
  background-color: #F3F4F6;
}

.pagination-page.active {
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 750px;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 5px;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.75rem 2rem 1rem 2rem;
  border-bottom: 1px solid #E5E7EB;
}

.modal-title {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.modal-icon {
  width: 3rem;
  height: 3rem;
  background-color: #E0E7FF;
  color: #4F46E5;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.title-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 0.25rem 0;
  font-family: 'Montserrat', sans-serif;
}

.title-content p {
  color: #6B7280;
  margin: 0;
  font-size: 0.875rem;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #F3F4F6;
  color: #374151;
}

.modal-form {
  padding: 5px 2rem 1.75rem 2rem;
  width: 100%;
  box-sizing: border-box;
}

.form-section {
  margin-bottom: 1.75rem;
}

.form-section:last-of-type {
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 1.25rem 0;
  font-family: 'Montserrat', sans-serif;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.625rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.label-text {
  font-weight: 500;
}

.required {
  color: #EF4444;
  font-weight: 600;
}

.input-wrapper, .textarea-wrapper, .select-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.form-input, .form-textarea, .form-select {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-textarea {
  min-height: 90px;
  padding-top: 0.875rem;
  resize: vertical;
}

.form-select {
  padding-right: 2.75rem;
  cursor: pointer;
}

.form-input:focus, .form-textarea:focus, .form-select:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.input-icon, .textarea-icon, .select-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #6B7280;
  pointer-events: none;
}

.input-icon, .select-icon {
  left: 0.875rem;
}

.textarea-icon {
  left: 0.875rem;
  top: 1.25rem;
  transform: none;
}

.select-icon {
  right: 0.875rem;
  left: auto;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #E5E7EB;
}

.cancel-btn, .submit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Open Sans', sans-serif;
}

.cancel-btn {
  background-color: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
}

.cancel-btn:hover {
  background-color: #E5E7EB;
}

.submit-btn {
  background-color: #4F46E5;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background-color: #4338CA;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Animations */
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hosting-page {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .header-right {
    justify-content: stretch;
  }

  .create-btn {
    flex: 1;
    justify-content: center;
  }

  .page-title h1 {
    font-size: 1.75rem;
  }

  .filters-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .search-box {
    min-width: none;
  }

  .filter-controls {
    justify-content: stretch;
  }

  .filter-select, .clear-filters-btn {
    flex: 1;
  }

  .hosting-table {
    font-size: 0.875rem;
  }

  th, td {
    padding: 0.75rem 1rem;
  }

  .modal-content {
    margin: 1rem;
    max-width: none;
    max-height: calc(100vh - 2rem);
  }

  .modal-header {
    padding: 1.5rem 1rem 1rem 1rem;
  }

  .modal-form {
    padding: 5px 1rem 1.5rem 1rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .cancel-btn, .submit-btn {
    width: 100%;
    justify-content: center;
  }

  .form-input, .form-textarea, .form-select {
    padding: 0.875rem 1rem 0.875rem 2.5rem;
  }

  .input-icon, .textarea-icon, .select-icon {
    left: 0.75rem;
  }

  .select-icon {
    right: 0.75rem;
    left: auto;
  }
}
</style>

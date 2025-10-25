<template>
  <div class="health-check-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <div class="page-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="page-title">
            <h1>Health Check</h1>
            <p>Monitor your backend system status and performance</p>
          </div>
        </div>
        <div class="header-right">
          <button @click="checkHealth" :disabled="isChecking" class="refresh-btn">
            <svg v-if="!isChecking" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg v-else class="spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {{ isChecking ? 'Checking...' : 'Refresh' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Health Status Card -->
    <div class="health-card">
      <div class="card-header">
        <h2>System Status</h2>
        <div class="status-badge" :class="healthStatus.status">
          <span class="status-dot"></span>
          <span class="status-text">{{ getStatusText(healthStatus.status) }}</span>
        </div>
      </div>

      <div class="card-content">
        <!-- Success State -->
        <div v-if="healthStatus.status === 'success'" class="status-success">
          <div class="success-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="success-content">
            <h3>System Healthy</h3>
            <p>Your backend is running smoothly and responding to requests.</p>
            <div class="response-time">
              <span class="label">Response Time:</span>
              <span class="value">{{ responseTime }}ms</span>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="healthStatus.status === 'error'" class="status-error">
          <div class="error-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="error-content">
            <h3>Connection Failed</h3>
            <p>{{ healthStatus.error }}</p>
            <div class="error-details">
              <span class="label">Last Check:</span>
              <span class="value">{{ formatTimestamp(healthStatus.timestamp) }}</span>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="status-loading">
          <div class="loading-icon">
            <svg class="spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
          <div class="loading-content">
            <h3>Checking System Health...</h3>
            <p>Please wait while we verify your backend connection.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Backend Response Details -->
    <div v-if="healthStatus.data" class="response-card">
      <div class="card-header">
        <h2>Backend Response</h2>
        <button @click="toggleResponseDetails" class="toggle-btn">
          <svg :class="{ 'rotated': showResponseDetails }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
      <div v-if="showResponseDetails" class="card-content">
        <div class="response-data">
          <pre>{{ JSON.stringify(healthStatus.data, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- System Information -->
    <div class="info-grid">
      <div class="info-card">
        <div class="info-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="info-content">
          <h3>Last Check</h3>
          <p>{{ healthStatus.timestamp ? formatTimestamp(healthStatus.timestamp) : 'Never' }}</p>
        </div>
      </div>

      <div class="info-card">
        <div class="info-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="info-content">
          <h3>Response Time</h3>
          <p>{{ responseTime }}ms</p>
        </div>
      </div>

      <div class="info-card">
        <div class="info-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <div class="info-content">
          <h3>Backend URL</h3>
          <p>{{ backendUrl }}</p>
        </div>
      </div>

      <div class="info-card">
        <div class="info-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </div>
        <div class="info-content">
          <h3>Check Count</h3>
          <p>{{ checkCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.js'
import config from '../config/index.js'

export default {
  name: 'HealthCheck',
  data() {
    return {
      healthStatus: {
        status: 'loading',
        data: null,
        error: null,
        timestamp: null
      },
      isChecking: false,
      responseTime: 0,
      showResponseDetails: false,
      checkCount: 0,
      backendUrl: config.backendUrl
    }
  },
  async mounted() {
    await this.checkHealth()
  },
  methods: {
    async checkHealth() {
      this.isChecking = true
      this.healthStatus.status = 'loading'
      
      const startTime = Date.now()
      
      try {
        const result = await apiService.checkHealth()
        this.responseTime = Date.now() - startTime
        this.healthStatus = result
        this.checkCount++
      } catch (error) {
        this.responseTime = Date.now() - startTime
        this.healthStatus = {
          status: 'error',
          error: error.message,
          timestamp: new Date().toISOString()
        }
        this.checkCount++
      } finally {
        this.isChecking = false
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'success': return 'Healthy'
        case 'error': return 'Error'
        case 'loading': return 'Checking'
        default: return 'Unknown'
      }
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return 'Never'
      return new Date(timestamp).toLocaleString()
    },
    toggleResponseDetails() {
      this.showResponseDetails = !this.showResponseDetails
    }
  }
}
</script>

<style scoped>
.health-check-page {
  padding: 2rem;
  max-width: 1200px;
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

.refresh-btn {
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
}

.refresh-btn:hover:not(:disabled) {
  background-color: #3730A3;
  transform: translateY(-1px);
}

.refresh-btn:disabled {
  background-color: #9CA3AF;
  cursor: not-allowed;
  transform: none;
}

.refresh-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Cards */
.health-card,
.response-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #E5E7EB;
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.875rem;
  font-family: 'Open Sans', sans-serif;
}

.status-badge.success {
  background-color: #D1FAE5;
  color: #065F46;
}

.status-badge.error {
  background-color: #FEE2E2;
  color: #991B1B;
}

.status-badge.loading {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: currentColor;
}

.card-content {
  padding: 2rem;
}

/* Status States */
.status-success,
.status-error,
.status-loading {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.success-icon,
.error-icon,
.loading-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.success-icon {
  background-color: #D1FAE5;
  color: #059669;
}

.error-icon {
  background-color: #FEE2E2;
  color: #DC2626;
}

.loading-icon {
  background-color: #DBEAFE;
  color: #2563EB;
}

.success-icon svg,
.error-icon svg,
.loading-icon svg {
  width: 2rem;
  height: 2rem;
}

.success-content h3,
.error-content h3,
.loading-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 0.5rem 0;
  font-family: 'Montserrat', sans-serif;
}

.success-content p,
.error-content p,
.loading-content p {
  font-size: 1rem;
  color: #6B7280;
  margin: 0 0 1rem 0;
  font-family: 'Open Sans', sans-serif;
}

.response-time,
.error-details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-family: 'Open Sans', sans-serif;
}

.label {
  color: #6B7280;
  font-weight: 500;
}

.value {
  color: #1F2937;
  font-weight: 600;
}

/* Response Details */
.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background-color: #F3F4F6;
}

.toggle-btn svg {
  width: 1rem;
  height: 1rem;
  color: #6B7280;
  transition: transform 0.2s;
}

.toggle-btn svg.rotated {
  transform: rotate(180deg);
}

.response-data {
  background-color: #F9FAFB;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid #E5E7EB;
}

.response-data pre {
  margin: 0;
  font-size: 0.875rem;
  color: #374151;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  overflow-x: auto;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #F3F4F6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  flex-shrink: 0;
}

.info-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.info-content h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6B7280;
  margin: 0 0 0.25rem 0;
  font-family: 'Open Sans', sans-serif;
}

.info-content p {
  font-size: 1rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

/* Animations */
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .health-check-page {
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
  
  .status-success,
  .status-error,
  .status-loading {
    flex-direction: column;
    text-align: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="health-card">
    <div class="card-header">
      <h2>Models API Health</h2>
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
    <div class="card-content">
      <div v-if="healthStatus === 'success'" class="status-success">
        <div class="status-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="status-content">
          <h3>API Healthy</h3>
          <p>Status: {{ healthData?.status || 'ok' }}</p>
          <p v-if="healthData?.environment">Environment: {{ healthData.environment }}</p>
          <p v-if="healthData?.uptime">Uptime: {{ formatUptime(healthData.uptime) }}</p>
        </div>
      </div>
      <div v-else-if="healthStatus === 'error'" class="status-error">
        <div class="status-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="status-content">
          <h3>Connection Failed</h3>
          <p>{{ error }}</p>
        </div>
      </div>
      <div v-else class="status-loading">
        <div class="status-icon">
          <svg class="spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </div>
        <div class="status-content">
          <h3>Checking Health...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modelsApi from '../../services/modelsApi.js'

export default {
  name: 'HealthCheckCard',
  data() {
    return {
      isChecking: false,
      healthStatus: 'loading',
      healthData: null,
      error: null
    }
  },
  async mounted() {
    await this.checkHealth()
  },
  methods: {
    async checkHealth() {
      this.isChecking = true
      this.healthStatus = 'loading'
      try {
        this.healthData = await modelsApi.checkHealth()
        this.healthStatus = 'success'
        this.error = null
      } catch (error) {
        this.healthStatus = 'error'
        this.error = error.message
      } finally {
        this.isChecking = false
      }
    },
    formatUptime(seconds) {
      if (!seconds) return 'Unknown'
      const days = Math.floor(seconds / 86400)
      const hours = Math.floor((seconds % 86400) / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      
      if (days > 0) return `${days}d ${hours}h`
      if (hours > 0) return `${hours}h ${minutes}m`
      return `${minutes}m`
    }
  }
}
</script>

<style scoped>
.health-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
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

.card-content {
  padding: 2rem;
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
}

.refresh-btn:disabled {
  background-color: #9CA3AF;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 1rem;
  height: 1rem;
}

.status-success,
.status-error,
.status-loading {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.status-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.status-success .status-icon {
  background-color: #D1FAE5;
  color: #059669;
}

.status-error .status-icon {
  background-color: #FEE2E2;
  color: #DC2626;
}

.status-loading .status-icon {
  background-color: #DBEAFE;
  color: #2563EB;
}

.status-icon svg {
  width: 2rem;
  height: 2rem;
}

.status-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 0.5rem 0;
  font-family: 'Montserrat', sans-serif;
}

.status-content p {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0.25rem 0;
  font-family: 'Open Sans', sans-serif;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

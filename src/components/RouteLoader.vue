<template>
  <div class="route-loader">
    <div class="loader-container">
      <div class="security-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      </div>
      <div class="loader-content">
        <h3 class="loader-title">Security Check</h3>
        <p class="loader-message">Validating access permissions...</p>
        <div class="loader-spinner">
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouteLoader'
}
</script>

<style scoped>
.route-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-container {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
}

.security-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  color: #667eea;
  animation: pulse 2s infinite;
}

.loader-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loader-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.loader-message {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.loader-spinner {
  margin-top: 1rem;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Mobile responsive */
@media (max-width: 640px) {
  .loader-container {
    padding: 2rem;
    margin: 1rem;
  }
  
  .security-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .loader-title {
    font-size: 1.25rem;
  }
}
</style>

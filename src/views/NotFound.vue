<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <div class="error-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      
      <div class="error-content">
        <h1 class="error-title">404 - Page Not Found</h1>
        <p class="error-message">
          The page you're looking for doesn't exist or you don't have permission to access it.
        </p>
        
        <div class="error-actions">
          <button @click="goHome" class="home-button">
            <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Go to Dashboard
          </button>
          
          <button @click="goBack" class="back-button">
            <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Go Back
          </button>
        </div>
        
        <div class="security-note">
          <svg class="security-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <span>All access attempts are logged for security purposes</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome() {
      this.$router.push('/dashboard')
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.not-found-container {
  background: white;
  border-radius: 1.5rem;
  padding: 4rem 3rem;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);
  max-width: 500px;
  width: 100%;
}

.error-icon {
  width: 5rem;
  height: 5rem;
  margin: 0 auto 2rem;
  color: #ef4444;
}

.error-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
  letter-spacing: -0.02em;
}

.error-message {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.home-button,
.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.home-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.home-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(102, 126, 234, 0.4);
}

.back-button {
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.back-button:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.1);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 500;
}

.security-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .not-found-page {
    padding: 1rem;
  }
  
  .not-found-container {
    padding: 2rem 1.5rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-message {
    font-size: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .home-button,
  .back-button {
    width: 100%;
    justify-content: center;
  }
}
</style>

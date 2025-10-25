<template>
  <div class="documentation-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">Documentation</h1>
          <p class="page-description">Comprehensive guides and API references for the Admin Console</p>
        </div>
        <div class="header-right">
          <div class="search-container">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" placeholder="Search documentation..." class="search-input" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="content-grid">
        <!-- Getting Started Section -->
        <div class="section-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h2 class="card-title">Getting Started</h2>
          </div>
           <div class="card-content">
             <ul class="bullet-list">
               <li @click="$router.push('/documentation/getting-started')">Quick Setup Guide</li>
               <li>Initial Configuration</li>
               <li>First Steps</li>
               <li>Basic Navigation</li>
               <li>User Permissions</li>
             </ul>
           </div>
        </div>

        <!-- API Reference Section -->
        <div class="section-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h2 class="card-title">API Reference</h2>
          </div>
           <div class="card-content">
             <ul class="bullet-list">
               <li @click="$router.push('/documentation/api-reference')">Authentication</li>
               <li @click="$router.push('/documentation/api-reference')">Endpoints Overview</li>
               <li @click="$router.push('/documentation/api-reference')">Request/Response Formats</li>
               <li @click="$router.push('/documentation/api-reference')">Error Handling</li>
               <li @click="$router.push('/documentation/api-reference')">Rate Limiting</li>
             </ul>
           </div>
        </div>

        <!-- Infrastructure Management Section -->
        <div class="section-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h2 class="card-title">Infrastructure</h2>
          </div>
           <div class="card-content">
             <ul class="bullet-list">
               <li @click="$router.push('/documentation/infrastructure')">Sites Management</li>
               <li @click="$router.push('/documentation/infrastructure')">Instances Configuration</li>
               <li @click="$router.push('/documentation/infrastructure')">Domain Management</li>
               <li @click="$router.push('/documentation/infrastructure')">Port Configuration</li>
               <li @click="$router.push('/documentation/infrastructure')">Hosting Providers</li>
             </ul>
           </div>
        </div>

        <!-- Monitoring Section -->
        <div class="section-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h2 class="card-title">Monitoring</h2>
          </div>
          <div class="card-content">
            <ul class="bullet-list">
              <li>Health Checks</li>
              <li>Performance Metrics</li>
              <li>Alert Configuration</li>
              <li>Log Management</li>
              <li>Status Monitoring</li>
            </ul>
          </div>
        </div>

        <!-- Security Section -->
        <div class="section-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2 class="card-title">Security</h2>
          </div>
          <div class="card-content">
            <ul class="bullet-list">
              <li>Access Control</li>
              <li>Authentication Methods</li>
              <li>SSL/TLS Configuration</li>
              <li>Firewall Rules</li>
              <li>Security Best Practices</li>
            </ul>
          </div>
        </div>

        <!-- Troubleshooting Section -->
        <div class="section-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 class="card-title">Troubleshooting</h2>
          </div>
          <div class="card-content">
            <ul class="bullet-list">
              <li>Common Issues</li>
              <li>Error Codes</li>
              <li>Debug Mode</li>
              <li>Support Resources</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Documentation',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    // Add search functionality later
  }
}
</script>

<style scoped>
.documentation-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  padding: 3rem 0;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.header-left {
  color: white;
  flex: 1;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  font-size: 1.25rem;
  opacity: 0.85;
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
  max-width: 600px;
}

.header-right {
  flex-shrink: 0;
  margin-left: 2rem;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  backdrop-filter: blur(20px);
  min-width: 24rem;
  transition: all 0.3s ease;
}

.search-container:focus-within {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
}

.search-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-right: 1rem;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1.1rem;
  color: white;
  font-weight: 500;
  font-family: inherit;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

/* Main Content */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem 4rem;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

/* Section Cards */
.section-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(226, 232, 240, 0.8);
  position: relative;
}

.section-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(102, 126, 234, 0.3);
}

.section-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.card-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3);
}

.card-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.card-content {
  padding: 0 2rem 2rem;
}

/* Bullet List */
.bullet-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bullet-list li {
  position: relative;
  padding: 1rem 0;
  color: #475569;
  font-weight: 500;
  font-size: 1rem;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
  transition: all 0.2s ease;
  cursor: pointer;
  border-radius: 0.5rem;
  margin: 0 -0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.bullet-list li:last-child {
  border-bottom: none;
}

.bullet-list li:hover {
  color: #0f172a;
  background-color: rgba(102, 126, 234, 0.05);
  transform: translateX(4px);
}

.bullet-list li::before {
  content: '→';
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
  position: absolute;
  left: -1.5rem;
  top: 1rem;
  transition: all 0.2s ease;
}

.bullet-list li:hover::before {
  transform: translateX(4px);
  color: #764ba2;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-content {
    padding: 0 2rem;
  }
  
  .main-content {
    padding: 0 2rem 3rem;
  }
  
  .content-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 0;
    margin-bottom: 2rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    padding: 0 1.5rem;
  }
  
  .page-title {
    font-size: 2.5rem;
  }
  
  .page-description {
    font-size: 1.125rem;
  }
  
  .search-container {
    min-width: 100%;
    max-width: 100%;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .main-content {
    padding: 0 1.5rem 2rem;
  }
  
  .card-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .card-content {
    padding: 0 1.5rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .page-header {
    padding: 1.5rem 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
  
  .search-container {
    padding: 0.875rem 1rem;
  }
  
  .search-input {
    font-size: 1rem;
  }
  
  .card-header {
    padding: 1.25rem 1.25rem 0.75rem;
  }
  
  .card-content {
    padding: 0 1.25rem 1.25rem;
  }
  
  .card-icon {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .bullet-list li {
    font-size: 0.95rem;
    padding: 0.875rem 0;
  }
}
</style>

<template>
  <DocContent
    title="Getting Started"
    description="Learn the basics of using the Admin Console and get up and running quickly with your infrastructure management."
    :sections="sections"
  >
    <!-- Introduction Section -->
    <section id="introduction" class="doc-section">
      <h2 class="section-title">Introduction</h2>
      <div class="section-content">
        <p class="intro-text">
          Welcome to the Moth Solutions Admin Console! This comprehensive platform provides you with powerful tools to manage your infrastructure, monitor system health, and maintain optimal performance across all your services.
        </p>
        
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3>Real-time Monitoring</h3>
            <p>Monitor your backend status with live indicators and health checks</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3>Infrastructure Management</h3>
            <p>Manage sites, instances, domains, ports, and hosting providers</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3>Quick Setup</h3>
            <p>Get started in minutes with our intuitive interface</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start Section -->
    <section id="quick-start" class="doc-section">
      <h2 class="section-title">Quick Start Guide</h2>
      <div class="section-content">
        <p>Follow these steps to get your Admin Console up and running:</p>
        
        <div class="steps-container">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Access the Admin Console</h3>
              <p>Navigate to the Admin Console URL and log in with your credentials.</p>
              <div class="code-block">
                <code>https://admin.moth.solutions</code>
              </div>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Verify Backend Connection</h3>
              <p>Check the database status indicator in the top header to ensure the backend is online.</p>
              <div class="info-box">
                <div class="info-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="info-content">
                  <strong>Look for:</strong> Green database icon with live indicator dot in the top-right header
                </div>
              </div>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Explore the Dashboard</h3>
              <p>Start with the Dashboard to get an overview of your infrastructure and system status.</p>
              <div class="tip-box">
                <div class="tip-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <div class="tip-content">
                  <strong>Pro Tip:</strong> The Dashboard provides a centralized view of all your infrastructure components
                </div>
              </div>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Configure Your First Site</h3>
              <p>Create your first site entry to begin managing your infrastructure.</p>
              <div class="action-box">
                <div class="action-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div class="action-content">
                  <strong>Action Required:</strong> Go to Sites → Create Site to add your first site
                </div>
              </div>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>Set Up Monitoring</h3>
              <p>Configure health checks and monitoring for your services to ensure optimal performance.</p>
              <div class="warning-box">
                <div class="warning-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <div class="warning-content">
                  <strong>Important:</strong> Regular monitoring helps prevent issues before they impact your users
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Section -->
    <section id="navigation" class="doc-section">
      <h2 class="section-title">Understanding the Interface</h2>
      <div class="section-content">
        <p>Familiarize yourself with the main components of the Admin Console:</p>
        
        <div class="interface-grid">
          <div class="interface-item">
            <h3>Sidebar Navigation</h3>
            <p>The left sidebar contains all main sections organized by category:</p>
            <ul class="interface-list">
              <li><strong>Overview:</strong> Dashboard and Analytics</li>
              <li><strong>Infrastructure:</strong> Sites, Instances, Domains, Ports, Hosting</li>
              <li><strong>Management:</strong> Enquiries, Billing, Health Check</li>
              <li><strong>System:</strong> Settings and Documentation</li>
            </ul>
          </div>
          
          <div class="interface-item">
            <h3>Top Header</h3>
            <p>The header contains important system information:</p>
            <ul class="interface-list">
              <li><strong>Database Status:</strong> Real-time backend connectivity indicator</li>
              <li><strong>User Profile:</strong> Access to account settings and logout</li>
              <li><strong>Hamburger Menu:</strong> Toggle sidebar visibility on mobile</li>
            </ul>
          </div>
          
          <div class="interface-item">
            <h3>Main Content Area</h3>
            <p>This is where you'll interact with your data:</p>
            <ul class="interface-list">
              <li><strong>Data Tables:</strong> View and manage your infrastructure</li>
              <li><strong>Action Buttons:</strong> Create, edit, delete, and refresh data</li>
              <li><strong>Filters & Search:</strong> Find specific items quickly</li>
              <li><strong>Pagination:</strong> Navigate through large datasets</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Next Steps Section -->
    <section id="next-steps" class="doc-section">
      <h2 class="section-title">Next Steps</h2>
      <div class="section-content">
        <p>Now that you're familiar with the basics, here's what to explore next:</p>
        
        <div class="next-steps-grid">
          <div class="next-step-card">
            <div class="next-step-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3>API Reference</h3>
            <p>Learn about the REST API endpoints and how to integrate with external systems.</p>
            <a href="/documentation/api-reference" class="next-step-link">View API Docs →</a>
          </div>
          
          <div class="next-step-card">
            <div class="next-step-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3>Infrastructure Management</h3>
            <p>Deep dive into managing your sites, instances, domains, and hosting providers.</p>
            <a href="/documentation/infrastructure" class="next-step-link">Learn More →</a>
          </div>
          
          <div class="next-step-card">
            <div class="next-step-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3>Monitoring & Health Checks</h3>
            <p>Set up comprehensive monitoring to keep your infrastructure healthy.</p>
            <a href="/documentation/monitoring" class="next-step-link">Get Started →</a>
          </div>
        </div>
      </div>
    </section>
  </DocContent>
</template>

<script>
import DocContent from '../components/DocContent.vue'

export default {
  name: 'GettingStarted',
  components: {
    DocContent
  },
  data() {
    return {
      sections: [
        {
          id: 'introduction',
          title: 'Introduction'
        },
        {
          id: 'quick-start',
          title: 'Quick Start Guide'
        },
        {
          id: 'navigation',
          title: 'Understanding the Interface'
        },
        {
          id: 'next-steps',
          title: 'Next Steps'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Section Styling */
.doc-section {
  padding: 3rem 3rem;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.doc-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 2rem 0;
  letter-spacing: -0.01em;
}

.section-content {
  color: #475569;
  line-height: 1.7;
}

.section-content > p {
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  color: #334155;
}

/* Feature Grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.feature-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.feature-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.feature-card p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Steps Container */
.steps-container {
  margin-top: 3rem;
}

.step-item {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.step-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.step-number {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
}

.step-content p {
  margin: 0 0 1.5rem 0;
  color: #475569;
}

/* Code Block */
.code-block {
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
}

.code-block code {
  color: #e2e8f0;
  font-size: 0.875rem;
}

/* Info Boxes */
.info-box,
.tip-box,
.action-box,
.warning-box {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  margin: 1rem 0;
  align-items: flex-start;
}

.info-box {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.tip-box {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.action-box {
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.warning-box {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.info-icon,
.tip-icon,
.action-icon,
.warning-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.info-icon svg,
.tip-icon svg,
.action-icon svg,
.warning-icon svg {
  width: 100%;
  height: 100%;
}

.info-icon svg {
  color: #3b82f6;
}

.tip-icon svg {
  color: #22c55e;
}

.action-icon svg {
  color: #a855f7;
}

.warning-icon svg {
  color: #f59e0b;
}

.info-content,
.tip-content,
.action-content,
.warning-content {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Interface Grid */
.interface-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.interface-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.interface-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.interface-list li {
  padding: 0.5rem 0;
  color: #475569;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.interface-list li:last-child {
  border-bottom: none;
}

/* Next Steps Grid */
.next-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.next-step-card {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.next-step-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.next-step-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.next-step-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.next-step-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.next-step-card p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.next-step-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.next-step-link:hover {
  color: #764ba2;
}

/* Responsive Design */
@media (max-width: 768px) {
  .doc-section {
    padding: 1.5rem 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .step-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .step-number {
    align-self: flex-start;
  }
  
  .feature-grid,
  .interface-grid,
  .next-steps-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .doc-section {
    padding: 1rem 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .intro-text {
    font-size: 1rem;
  }
}
</style>

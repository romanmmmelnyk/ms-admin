<template>
  <DocContent
    title="Infrastructure Management"
    description="Comprehensive guide to managing your infrastructure components including sites, instances, domains, ports, and hosting providers."
    :sections="sections"
  >
    <!-- Sites Management Section -->
    <section id="sites" class="doc-section">
      <h2 class="section-title">Sites Management</h2>
      <div class="section-content">
        <p>Sites represent your web applications and services. Each site entry contains essential information about your web properties.</p>
        
        <div class="management-overview">
          <div class="overview-card">
            <h3>Creating Sites</h3>
            <p>Add new sites to track your web applications and services.</p>
            <div class="action-steps">
              <div class="step">
                <span class="step-number">1</span>
                <span>Navigate to Sites page</span>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <span>Click "Create Site" button</span>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <span>Fill in site details</span>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <span>Save the site</span>
              </div>
            </div>
          </div>
          
          <div class="overview-card">
            <h3>Site Information</h3>
            <p>Each site includes the following details:</p>
            <ul class="info-list">
              <li><strong>Site Name:</strong> Descriptive name for your site</li>
              <li><strong>URL:</strong> Primary URL of the site</li>
              <li><strong>Description:</strong> Additional details about the site</li>
              <li><strong>Status:</strong> Current operational status</li>
              <li><strong>Created Date:</strong> When the site was added</li>
            </ul>
          </div>
        </div>
        
        <div class="tip-box">
          <div class="tip-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div class="tip-content">
            <strong>Pro Tip:</strong> Use descriptive names for your sites to easily identify them in the dashboard and reports.
          </div>
        </div>
      </div>
    </section>

    <!-- Instances Management Section -->
    <section id="instances" class="doc-section">
      <h2 class="section-title">Instances Management</h2>
      <div class="section-content">
        <p>Instances represent your server instances and virtual machines. Manage your compute resources efficiently.</p>
        
        <div class="instance-types">
          <div class="type-card">
            <div class="type-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <h3>Virtual Machines</h3>
            <p>Cloud-based virtual machines running your applications</p>
          </div>
          
          <div class="type-card">
            <div class="type-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
            </div>
            <h3>Physical Servers</h3>
            <p>Dedicated physical hardware for high-performance needs</p>
          </div>
          
          <div class="type-card">
            <div class="type-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
              </svg>
            </div>
            <h3>Container Instances</h3>
            <p>Containerized applications and microservices</p>
          </div>
        </div>
        
        <div class="instance-details">
          <h3>Instance Configuration</h3>
          <p>When creating or updating instances, you can configure:</p>
          <div class="config-grid">
            <div class="config-item">
              <h4>Basic Information</h4>
              <ul>
                <li>Instance name</li>
                <li>Description</li>
                <li>IP address</li>
              </ul>
            </div>
            <div class="config-item">
              <h4>Hosting Details</h4>
              <ul>
                <li>Hosting provider</li>
                <li>Server location</li>
                <li>Instance type</li>
              </ul>
            </div>
            <div class="config-item">
              <h4>Resource Allocation</h4>
              <ul>
                <li>CPU cores</li>
                <li>Memory (RAM)</li>
                <li>Storage capacity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Domains Management Section -->
    <section id="domains" class="doc-section">
      <h2 class="section-title">Domains Management</h2>
      <div class="section-content">
        <p>Manage your domain names, DNS settings, and domain-related configurations in one place.</p>
        
        <div class="domain-features">
          <div class="feature-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
              </div>
              <h3>Domain Registration</h3>
              <p>Track domain registration details and expiration dates</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3>Expiration Monitoring</h3>
              <p>Get alerts before domains expire</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3>Cost Tracking</h3>
              <p>Monitor domain renewal costs and budgets</p>
            </div>
          </div>
        </div>
        
        <div class="domain-config">
          <h3>Domain Configuration</h3>
          <div class="config-sections">
            <div class="config-section">
              <h4>Basic Domain Information</h4>
              <ul>
                <li><strong>Domain Name:</strong> The actual domain (e.g., example.com)</li>
                <li><strong>Instance:</strong> Associated server instance</li>
                <li><strong>Provider:</strong> Domain registrar</li>
                <li><strong>Auto-renewal:</strong> Automatic renewal settings</li>
              </ul>
            </div>
            
            <div class="config-section">
              <h4>Financial Information</h4>
              <ul>
                <li><strong>Annual Price:</strong> Yearly renewal cost</li>
                <li><strong>Currency:</strong> Payment currency</li>
                <li><strong>Paid Until:</strong> Expiration date</li>
                <li><strong>Payment Method:</strong> Billing information</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="warning-box">
          <div class="warning-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="warning-content">
            <strong>Important:</strong> Always enable auto-renewal for critical domains to prevent accidental expiration and service disruption.
          </div>
        </div>
      </div>
    </section>

    <!-- Ports Management Section -->
    <section id="ports" class="doc-section">
      <h2 class="section-title">Ports Management</h2>
      <div class="section-content">
        <p>Manage network ports and their configurations for your services and applications.</p>
        
        <div class="port-categories">
          <h3>Port Categories</h3>
          <div class="category-grid">
            <div class="category-card">
              <div class="category-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                </svg>
              </div>
              <h4>Web Services</h4>
              <p>HTTP/HTTPS ports for web applications</p>
              <div class="port-examples">80, 443, 8080</div>
            </div>
            
            <div class="category-card">
              <div class="category-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
              </div>
              <h4>Database</h4>
              <p>Database connection ports</p>
              <div class="port-examples">3306, 5432, 6379</div>
            </div>
            
            <div class="category-card">
              <div class="category-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h4>SSH/Terminal</h4>
              <p>Secure shell and terminal access</p>
              <div class="port-examples">22, 2222</div>
            </div>
            
            <div class="category-card">
              <div class="category-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H7z"></path>
                </svg>
              </div>
              <h4>Custom Services</h4>
              <p>Application-specific ports</p>
              <div class="port-examples">3000, 5000, 8000</div>
            </div>
          </div>
        </div>
        
        <div class="port-management">
          <h3>Port Management Features</h3>
          <div class="management-features">
            <div class="feature-list">
              <div class="feature-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Port availability checking</span>
              </div>
              <div class="feature-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Service association</span>
              </div>
              <div class="feature-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Security group management</span>
              </div>
              <div class="feature-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Port monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hosting Providers Section -->
    <section id="hosting" class="doc-section">
      <h2 class="section-title">Hosting Providers</h2>
      <div class="section-content">
        <p>Manage your hosting providers and track costs across different cloud and hosting services.</p>
        
        <div class="provider-overview">
          <div class="provider-stats">
            <div class="stat-card">
              <div class="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                </svg>
              </div>
              <div class="stat-content">
                <h3>Cloud Providers</h3>
                <p>AWS, Google Cloud, Azure, DigitalOcean</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="stat-content">
                <h3>Cost Tracking</h3>
                <p>Monitor spending across all providers</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div class="stat-content">
                <h3>Resource Management</h3>
                <p>Track instances per provider</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="hosting-config">
          <h3>Hosting Provider Configuration</h3>
          <div class="config-details">
            <div class="detail-section">
              <h4>Provider Information</h4>
              <ul>
                <li><strong>Provider Name:</strong> Cloud service provider name</li>
                <li><strong>Account ID:</strong> Your account identifier</li>
                <li><strong>Region:</strong> Primary data center location</li>
                <li><strong>Service Level:</strong> Support tier</li>
              </ul>
            </div>
            
            <div class="detail-section">
              <h4>Financial Tracking</h4>
              <ul>
                <li><strong>Annual Cost:</strong> Yearly hosting expenses</li>
                <li><strong>Currency:</strong> Billing currency</li>
                <li><strong>Last Payment:</strong> Most recent payment date</li>
                <li><strong>Payment Method:</strong> Billing information</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="tip-box">
          <div class="tip-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div class="tip-content">
            <strong>Best Practice:</strong> Regularly review your hosting costs and consider consolidating services to optimize your infrastructure spending.
          </div>
        </div>
      </div>
    </section>
  </DocContent>
</template>

<script>
import DocContent from '../components/DocContent.vue'

export default {
  name: 'Infrastructure',
  components: {
    DocContent
  },
  data() {
    return {
      sections: [
        {
          id: 'sites',
          title: 'Sites Management'
        },
        {
          id: 'instances',
          title: 'Instances Management'
        },
        {
          id: 'domains',
          title: 'Domains Management'
        },
        {
          id: 'ports',
          title: 'Ports Management'
        },
        {
          id: 'hosting',
          title: 'Hosting Providers'
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

/* Management Overview */
.management-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.overview-card {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
}

.overview-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
}

.overview-card p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1rem 0;
}

.action-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #475569;
}

.step-number {
  width: 1.5rem;
  height: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  padding: 0.5rem 0;
  color: #475569;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.info-list li:last-child {
  border-bottom: none;
}

/* Instance Types */
.instance-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.type-card {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.type-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

.type-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.type-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.type-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.type-card p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Instance Details */
.instance-details {
  margin-top: 3rem;
}

.instance-details h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.config-item {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.config-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
}

.config-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.config-item li {
  padding: 0.375rem 0;
  color: #475569;
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.config-item li:last-child {
  border-bottom: none;
}

/* Domain Features */
.domain-features {
  margin: 2rem 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.feature-item {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-item:hover {
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

.feature-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.feature-item p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Domain Config */
.domain-config {
  margin-top: 3rem;
}

.domain-config h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.config-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.config-section {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
}

.config-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.config-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.config-section li {
  padding: 0.5rem 0;
  color: #475569;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.config-section li:last-child {
  border-bottom: none;
}

/* Port Categories */
.port-categories {
  margin: 2rem 0;
}

.port-categories h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1.5rem 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

.category-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.category-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.category-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.category-card p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.75rem 0;
}

.port-examples {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  display: inline-block;
}

/* Port Management */
.port-management {
  margin-top: 3rem;
}

.port-management h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.management-features {
  margin-top: 1.5rem;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 0.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.feature-item svg {
  width: 1rem;
  height: 1rem;
  color: #22c55e;
  flex-shrink: 0;
}

.feature-item span {
  font-size: 0.875rem;
  color: #475569;
}

/* Hosting Providers */
.provider-overview {
  margin: 2rem 0;
}

.provider-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.stat-card {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.stat-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.25rem 0;
}

.stat-content p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Hosting Config */
.hosting-config {
  margin-top: 3rem;
}

.hosting-config h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.config-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.detail-section {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
}

.detail-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.detail-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-section li {
  padding: 0.5rem 0;
  color: #475569;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.detail-section li:last-child {
  border-bottom: none;
}

/* Info Boxes */
.info-box,
.tip-box,
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

.warning-box {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.info-icon,
.tip-icon,
.warning-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.info-icon svg,
.tip-icon svg,
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

.warning-icon svg {
  color: #f59e0b;
}

.info-content,
.tip-content,
.warning-content {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .doc-section {
    padding: 1.5rem 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .management-overview,
  .instance-types,
  .feature-grid,
  .config-grid,
  .config-sections,
  .category-grid,
  .provider-stats,
  .config-details {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .doc-section {
    padding: 1rem 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-content > p {
    font-size: 1rem;
  }
}
</style>

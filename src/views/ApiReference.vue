<template>
  <DocContent
    title="API Reference"
    description="Complete reference for the Admin Console REST API endpoints, authentication, and data formats."
    :sections="sections"
  >
    <!-- Authentication Section -->
    <section id="authentication" class="doc-section">
      <h2 class="section-title">Authentication</h2>
      <div class="section-content">
        <p>The Admin Console API uses token-based authentication. All API requests must include a valid authentication token in the request headers.</p>
        
        <div class="auth-methods">
          <div class="auth-method">
            <h3>Bearer Token Authentication</h3>
            <p>Include your access token in the Authorization header:</p>
            <div class="code-block">
              <code>Authorization: Bearer your_access_token_here</code>
            </div>
          </div>
          
          <div class="auth-method">
            <h3>API Key Authentication</h3>
            <p>Include your API key in the X-API-Key header:</p>
            <div class="code-block">
              <code>X-API-Key: your_api_key_here</code>
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
            <strong>Security Note:</strong> Keep your API keys secure and never expose them in client-side code or public repositories.
          </div>
        </div>
      </div>
    </section>

    <!-- Base URL Section -->
    <section id="base-url" class="doc-section">
      <h2 class="section-title">Base URL</h2>
      <div class="section-content">
        <p>All API endpoints are relative to the following base URL:</p>
        <div class="code-block">
          <code>https://server.moth.solutions/api</code>
        </div>
        
        <div class="info-box">
          <div class="info-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="info-content">
            <strong>Note:</strong> The API uses HTTPS for all communications to ensure data security.
          </div>
        </div>
      </div>
    </section>

    <!-- Endpoints Overview Section -->
    <section id="endpoints" class="doc-section">
      <h2 class="section-title">API Endpoints</h2>
      <div class="section-content">
        <p>Below are the main API endpoints available in the Admin Console:</p>
        
        <div class="endpoints-grid">
          <div class="endpoint-category">
            <h3>Sites Management</h3>
            <div class="endpoint-list">
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/sites</span>
                <span class="description">List all sites</span>
              </div>
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/sites/{id}</span>
                <span class="description">Get site by ID</span>
              </div>
              <div class="endpoint-item">
                <span class="method post">POST</span>
                <span class="path">/sites</span>
                <span class="description">Create new site</span>
              </div>
              <div class="endpoint-item">
                <span class="method patch">PATCH</span>
                <span class="path">/sites/{id}</span>
                <span class="description">Update site</span>
              </div>
              <div class="endpoint-item">
                <span class="method delete">DELETE</span>
                <span class="path">/sites/{id}</span>
                <span class="description">Delete site</span>
              </div>
            </div>
          </div>
          
          <div class="endpoint-category">
            <h3>Instances Management</h3>
            <div class="endpoint-list">
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/instances</span>
                <span class="description">List all instances</span>
              </div>
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/instances/{id}</span>
                <span class="description">Get instance by ID</span>
              </div>
              <div class="endpoint-item">
                <span class="method post">POST</span>
                <span class="path">/instances</span>
                <span class="description">Create new instance</span>
              </div>
              <div class="endpoint-item">
                <span class="method patch">PATCH</span>
                <span class="path">/instances/{id}</span>
                <span class="description">Update instance</span>
              </div>
              <div class="endpoint-item">
                <span class="method delete">DELETE</span>
                <span class="path">/instances/{id}</span>
                <span class="description">Delete instance</span>
              </div>
            </div>
          </div>
          
          <div class="endpoint-category">
            <h3>Domains Management</h3>
            <div class="endpoint-list">
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/domains</span>
                <span class="description">List all domains</span>
              </div>
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/domains/{id}</span>
                <span class="description">Get domain by ID</span>
              </div>
              <div class="endpoint-item">
                <span class="method post">POST</span>
                <span class="path">/domains</span>
                <span class="description">Create new domain</span>
              </div>
              <div class="endpoint-item">
                <span class="method patch">PATCH</span>
                <span class="path">/domains/{id}</span>
                <span class="description">Update domain</span>
              </div>
              <div class="endpoint-item">
                <span class="method delete">DELETE</span>
                <span class="path">/domains/{id}</span>
                <span class="description">Delete domain</span>
              </div>
            </div>
          </div>
          
          <div class="endpoint-category">
            <h3>System Endpoints</h3>
            <div class="endpoint-list">
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/health</span>
                <span class="description">Health check</span>
              </div>
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/ports</span>
                <span class="description">List all ports</span>
              </div>
              <div class="endpoint-item">
                <span class="method get">GET</span>
                <span class="path">/hostings</span>
                <span class="description">List hosting providers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Request/Response Formats Section -->
    <section id="formats" class="doc-section">
      <h2 class="section-title">Request & Response Formats</h2>
      <div class="section-content">
        <p>All API requests and responses use JSON format with UTF-8 encoding.</p>
        
        <div class="format-examples">
          <div class="format-example">
            <h3>Request Headers</h3>
            <div class="code-block">
              <code>Content-Type: application/json
Accept: application/json
Authorization: Bearer your_token_here</code>
            </div>
          </div>
          
          <div class="format-example">
            <h3>Success Response</h3>
            <div class="code-block">
              <code>{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Example Site",
    "url": "https://example.com",
    "created_at": "2024-01-01T00:00:00Z"
  }
}</code>
            </div>
          </div>
          
          <div class="format-example">
            <h3>Error Response</h3>
            <div class="code-block">
              <code>{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "name": "Name is required"
    }
  }
}</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Error Handling Section -->
    <section id="error-handling" class="doc-section">
      <h2 class="section-title">Error Handling</h2>
      <div class="section-content">
        <p>The API uses standard HTTP status codes to indicate the success or failure of requests:</p>
        
        <div class="status-codes">
          <div class="status-code success">
            <span class="code">200</span>
            <span class="description">OK - Request successful</span>
          </div>
          <div class="status-code success">
            <span class="code">201</span>
            <span class="description">Created - Resource created successfully</span>
          </div>
          <div class="status-code client-error">
            <span class="code">400</span>
            <span class="description">Bad Request - Invalid request data</span>
          </div>
          <div class="status-code client-error">
            <span class="code">401</span>
            <span class="description">Unauthorized - Invalid or missing authentication</span>
          </div>
          <div class="status-code client-error">
            <span class="code">404</span>
            <span class="description">Not Found - Resource not found</span>
          </div>
          <div class="status-code server-error">
            <span class="code">500</span>
            <span class="description">Internal Server Error - Server error</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Rate Limiting Section -->
    <section id="rate-limiting" class="doc-section">
      <h2 class="section-title">Rate Limiting</h2>
      <div class="section-content">
        <p>API requests are rate limited to ensure fair usage and system stability:</p>
        
        <div class="rate-limits">
          <div class="rate-limit">
            <h3>Standard Limits</h3>
            <ul>
              <li><strong>1000 requests per hour</strong> per API key</li>
              <li><strong>100 requests per minute</strong> per IP address</li>
              <li><strong>10 concurrent requests</strong> per API key</li>
            </ul>
          </div>
          
          <div class="rate-limit">
            <h3>Rate Limit Headers</h3>
            <p>Rate limit information is included in response headers:</p>
            <div class="code-block">
              <code>X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200</code>
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
            <strong>Pro Tip:</strong> Implement exponential backoff when you receive 429 (Too Many Requests) responses to handle rate limits gracefully.
          </div>
        </div>
      </div>
    </section>
  </DocContent>
</template>

<script>
import DocContent from '../components/DocContent.vue'

export default {
  name: 'ApiReference',
  components: {
    DocContent
  },
  data() {
    return {
      sections: [
        {
          id: 'authentication',
          title: 'Authentication'
        },
        {
          id: 'base-url',
          title: 'Base URL'
        },
        {
          id: 'endpoints',
          title: 'API Endpoints'
        },
        {
          id: 'formats',
          title: 'Request & Response Formats'
        },
        {
          id: 'error-handling',
          title: 'Error Handling'
        },
        {
          id: 'rate-limiting',
          title: 'Rate Limiting'
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

/* Auth Methods */
.auth-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.auth-method {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
}

.auth-method h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
}

.auth-method p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1rem 0;
}

/* Code Block */
.code-block {
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
  overflow-x: auto;
}

.code-block code {
  color: #e2e8f0;
  font-size: 0.875rem;
  white-space: pre;
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

/* Endpoints Grid */
.endpoints-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.endpoint-category {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
}

.endpoint-category h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.endpoint-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.endpoint-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 0.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.method {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  min-width: 3rem;
  text-align: center;
}

.method.get {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.method.post {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.method.patch {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.method.delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.path {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
  min-width: 8rem;
}

.description {
  font-size: 0.875rem;
  color: #64748b;
  flex: 1;
}

/* Format Examples */
.format-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.format-example {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
}

.format-example h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

/* Status Codes */
.status-codes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.status-code {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.status-code.success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.2);
}

.status-code.client-error {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.2);
}

.status-code.server-error {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
}

.code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
  font-size: 1rem;
  min-width: 3rem;
}

.description {
  font-size: 0.875rem;
  color: #475569;
}

/* Rate Limits */
.rate-limits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.rate-limit {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
}

.rate-limit h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.rate-limit ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rate-limit li {
  padding: 0.5rem 0;
  color: #475569;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

.rate-limit li:last-child {
  border-bottom: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .doc-section {
    padding: 1.5rem 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .auth-methods,
  .endpoints-grid,
  .format-examples,
  .rate-limits {
    grid-template-columns: 1fr;
  }
  
  .endpoint-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .path {
    min-width: auto;
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

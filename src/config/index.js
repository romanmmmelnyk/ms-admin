// Environment configuration
export const config = {
  // Backend API URL - set this in your .env file as VITE_BACKEND_URL
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:7300',
  
  // Models API URL - set this in your .env file as VITE_MODEL_API
  modelApiUrl: import.meta.env.VITE_MODEL_API || 'http://localhost:7300',
  
  // API endpoints
  api: {
    baseUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:7300',
    timeout: 10000, // 10 seconds
  },
  
  // Models API endpoints
  modelsApi: {
    baseUrl: import.meta.env.VITE_MODEL_API || 'http://localhost:7300',
    timeout: 10000, // 10 seconds
    token: import.meta.env.VITE_MODEL_API_TOKEN || ''
  },
  
  // Authentication settings
  auth: {
    adminUsername: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    adminPassword: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
  },
  
  // JWT Secret for Models API authentication
  jwtSecret: import.meta.env.VITE_JWT_SECRET || ''
}

export default config


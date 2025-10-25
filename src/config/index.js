// Environment configuration
export const config = {
  // Backend API URL - set this in your .env file as VITE_BACKEND_URL
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:7300',
  
  // API endpoints
  api: {
    baseUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:7300',
    timeout: 10000, // 10 seconds
  },
  
  // Authentication settings
  auth: {
    adminUsername: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    adminPassword: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
  }
}

export default config


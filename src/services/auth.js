import config from '../config/index.js'

class AuthService {
  constructor() {
    this.isAuthenticated = false
    this.user = null
    this.token = null
    this.loadFromStorage()
  }

  // Load authentication state from localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('admin_auth')
      if (stored) {
        const authData = JSON.parse(stored)
        this.isAuthenticated = authData.isAuthenticated
        this.user = authData.user
        this.token = authData.token
      }
    } catch (error) {
      console.error('Error loading auth from storage:', error)
      this.clearAuth()
    }
  }

  // Save authentication state to localStorage
  saveToStorage() {
    try {
      const authData = {
        isAuthenticated: this.isAuthenticated,
        user: this.user,
        token: this.token
      }
      localStorage.setItem('admin_auth', JSON.stringify(authData))
    } catch (error) {
      console.error('Error saving auth to storage:', error)
    }
  }

  // Clear authentication state
  clearAuth() {
    this.isAuthenticated = false
    this.user = null
    this.token = null
    localStorage.removeItem('admin_auth')
  }

  // Login method
  async login(username, password) {
    try {
      // Get credentials from environment
      const adminUsername = config.auth.adminUsername
      const adminPassword = config.auth.adminPassword

      // Simple credential check
      if (username === adminUsername && password === adminPassword) {
        // Generate a simple token (in production, this would come from the server)
        const token = this.generateToken()
        
        this.isAuthenticated = true
        this.user = {
          username: username,
          name: 'Roman',
          role: 'admin'
        }
        this.token = token
        
        this.saveToStorage()
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  // Generate a simple token (for demo purposes)
  generateToken() {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2)
    return `admin_${timestamp}_${random}`
  }

  // Logout method
  logout() {
    this.clearAuth()
  }

  // Check if user is authenticated
  isLoggedIn() {
    return this.isAuthenticated
  }

  // Get current user
  getCurrentUser() {
    return this.user
  }

  // Get current token
  getToken() {
    return this.token
  }

  // Verify token (for API calls)
  verifyToken() {
    if (!this.token) return false
    
    // In a real app, you'd verify with the server
    // For now, just check if token exists and is not expired
    const tokenParts = this.token.split('_')
    if (tokenParts.length !== 3) return false
    
    const timestamp = parseInt(tokenParts[1])
    const now = Date.now()
    const tokenAge = now - timestamp
    
    // Token expires after 24 hours
    const maxAge = 24 * 60 * 60 * 1000
    
    if (tokenAge > maxAge) {
      this.clearAuth()
      return false
    }
    
    return true
  }

  // Get auth headers for API calls
  getAuthHeaders() {
    if (!this.verifyToken()) {
      return {}
    }
    
    return {
      'Authorization': `Bearer ${this.token}`,
      'X-Admin-Token': this.token
    }
  }
}

export const authService = new AuthService()

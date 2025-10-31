import config from '../config/index.js'

class ModelsApiService {
  constructor() {
    this.baseUrl = config.modelsApi.baseUrl
    this.timeout = config.modelsApi.timeout
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    // Build headers - don't include Content-Type for FormData (browser sets it automatically)
    const headers = {
      'X-Admin-Token': config.modelsApi.token,
      ...options.headers,
    }
    
    // Only set Content-Type to JSON if not sending FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError') {
        throw new Error('Request timed out')
      }
      throw error
    }
  }

  // Health Check
  async checkHealth() {
    return await this.request('/api/health')
  }

  // Users Management
  async getUsers(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/users${query ? `?${query}` : ''}`)
  }

  async getUser(id) {
    return await this.request(`/api/admin/users/${id}`)
  }

  async updateUser(id, data) {
    return await this.request(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async deleteUser(id) {
    return await this.request(`/api/admin/users/${id}`, {
      method: 'DELETE'
    })
  }

  async bulkUpdateUsers(data) {
    return await this.request('/api/admin/users/bulk-update', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Website Requests
  async getWebsiteRequests(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/website-requests${query ? `?${query}` : ''}`)
  }

  async getWebsiteRequest(id) {
    return await this.request(`/api/admin/website-requests/${id}`)
  }

  async updateWebsiteRequestStatus(id, data) {
    return await this.request(`/api/admin/website-requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // Billing
  async getBillings(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/billings${query ? `?${query}` : ''}`)
  }

  async getBilling(id) {
    return await this.request(`/api/admin/billings/${id}`)
  }

  async updateBillingStatus(id, data) {
    return await this.request(`/api/admin/billings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // Applications
  async getApplications(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/applications${query ? `?${query}` : ''}`)
  }

  async getApplication(id) {
    return await this.request(`/api/admin/applications/${id}`)
  }

  async updateApplicationStatus(id, data) {
    return await this.request(`/api/admin/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // Bookings
  async getBookings(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/bookings${query ? `?${query}` : ''}`)
  }

  async getBooking(id) {
    return await this.request(`/api/admin/bookings/${id}`)
  }

  async updateBookingStatus(id, data) {
    return await this.request(`/api/admin/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async deleteBooking(id) {
    return await this.request(`/api/admin/bookings/${id}`, {
      method: 'DELETE'
    })
  }

  async bulkDeleteBookings(data) {
    return await this.request('/api/admin/bookings/bulk-delete', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Media
  async getMedia(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/media${query ? `?${query}` : ''}`)
  }

  async getMediaItem(id) {
    return await this.request(`/api/admin/media/${id}`)
  }

  async updateMedia(id, data) {
    return await this.request(`/api/admin/media/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async deleteMedia(id) {
    return await this.request(`/api/admin/media/${id}`, {
      method: 'DELETE'
    })
  }

  async bulkDeleteMedia(data) {
    return await this.request('/api/admin/media/bulk-delete', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Notifications
  async getNotifications(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/notifications${query ? `?${query}` : ''}`)
  }

  async createNotification(data) {
    return await this.request('/api/admin/notifications', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async deleteNotification(id) {
    return await this.request(`/api/admin/notifications/${id}`, {
      method: 'DELETE'
    })
  }

  async bulkDeleteNotifications(data) {
    return await this.request('/api/admin/notifications/bulk-delete', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Templates
  async getTemplates(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/templates${query ? `?${query}` : ''}`)
  }

  async getTemplate(id) {
    return await this.request(`/api/admin/templates/${id}`)
  }

  async createTemplate(data) {
    return await this.request('/api/admin/templates', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateTemplate(id, data) {
    return await this.request(`/api/admin/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async deleteTemplate(id) {
    return await this.request(`/api/admin/templates/${id}`, {
      method: 'DELETE'
    })
  }

  async uploadTemplatePdf(id, file) {
    const url = `${this.baseUrl}/api/admin/templates/${id}/pdf`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    const form = new FormData()
    form.append('file', file)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Admin-Token': config.modelsApi.token
          // Don't set Content-Type; browser sets multipart boundary
        },
        body: form,
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`)
      }
      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError') throw new Error('Request timed out')
      throw error
    }
  }

  // Sessions
  async getSessions(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/sessions${query ? `?${query}` : ''}`)
  }

  async deleteSession(id) {
    return await this.request(`/api/admin/sessions/${id}`, {
      method: 'DELETE'
    })
  }

  async revokeUserSessions(userId) {
    return await this.request(`/api/admin/sessions/user/${userId}/revoke`, {
      method: 'POST'
    })
  }

  // Tenants
  async getTenants() {
    return await this.request('/api/admin/tenants')
  }

  async getTenant(id) {
    return await this.request(`/api/admin/tenants/${id}`)
  }

  // Stats
  async getStats(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/stats${query ? `?${query}` : ''}`)
  }

  // Activity
  async getActivity(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/activity${query ? `?${query}` : ''}`)
  }

  async getUserActivity(userId) {
    return await this.request(`/api/admin/activity/user/${userId}`)
  }

  // Reports
  async getUsersReport(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/reports/users${query ? `?${query}` : ''}`)
  }

  async getRevenueReport(params = {}) {
    const query = new URLSearchParams(params).toString()
    return await this.request(`/api/admin/reports/revenue${query ? `?${query}` : ''}`)
  }
}

export default new ModelsApiService()

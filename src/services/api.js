import config from '../config/index.js'

class ApiService {
  constructor() {
    this.baseUrl = config.api.baseUrl
    this.timeout = config.api.timeout
  }

  async request(endpoint, options = {}) {
    // Add /api prefix for most endpoints, but not for /health
    const apiEndpoint = endpoint.startsWith('/health') ? endpoint : `/api${endpoint}`
    const url = `${this.baseUrl}${apiEndpoint}`
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
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

  // Health Check - direct endpoint (no /api prefix)
  async checkHealth() {
    try {
      const response = await this.request('/health')
      return {
        status: 'success',
        data: response,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }
  }

  // Sites API endpoints
  async getSites(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString()
    const endpoint = queryParams ? `/sites?${queryParams}` : '/sites'
    return await this.request(endpoint)
  }

  async getSite(id) {
    return await this.request(`/sites/${id}`)
  }

  async createSite(siteData) {
    return await this.request('/sites', {
      method: 'POST',
      body: JSON.stringify(siteData)
    })
  }

  async updateSite(id, siteData) {
    return await this.request(`/sites/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(siteData)
    })
  }

  async deleteSite(id) {
    return await this.request(`/sites/${id}`, {
      method: 'DELETE'
    })
  }

  // Instances API endpoints
  async getInstances() {
    return await this.request('/instances')
  }

  async getInstance(id) {
    return await this.request(`/instances/${id}`)
  }

  async createInstance(instanceData) {
    return await this.request('/instances', {
      method: 'POST',
      body: JSON.stringify(instanceData)
    })
  }

  async updateInstance(id, instanceData) {
    return await this.request(`/instances/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(instanceData)
    })
  }

  async deleteInstance(id) {
    return await this.request(`/instances/${id}`, {
      method: 'DELETE'
    })
  }

  // Domains API endpoints
  async getDomains(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString()
    const endpoint = queryParams ? `/domains?${queryParams}` : '/domains'
    return await this.request(endpoint)
  }

  async getDomain(id) {
    return await this.request(`/domains/${id}`)
  }

  async createDomain(domainData) {
    return await this.request('/domains', {
      method: 'POST',
      body: JSON.stringify(domainData)
    })
  }

  async updateDomain(id, domainData) {
    return await this.request(`/domains/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(domainData)
    })
  }

  async deleteDomain(id) {
    return await this.request(`/domains/${id}`, {
      method: 'DELETE'
    })
  }

  // Hosting API endpoints
  async getHostings() {
    return await this.request('/hostings')
  }

  async getHosting(id) {
    return await this.request(`/hostings/${id}`)
  }

  async createHosting(hostingData) {
    return await this.request('/hostings', {
      method: 'POST',
      body: JSON.stringify(hostingData)
    })
  }

  async updateHosting(id, hostingData) {
    return await this.request(`/hostings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(hostingData)
    })
  }

  async deleteHosting(id) {
    return await this.request(`/hostings/${id}`, {
      method: 'DELETE'
    })
  }

  // Ports API endpoints
  async getPorts() {
    return await this.request('/ports')
  }

  async getPort(id) {
    return await this.request(`/ports/${id}`)
  }

  async createPort(portData) {
    return await this.request('/ports', {
      method: 'POST',
      body: JSON.stringify(portData)
    })
  }

  async updatePort(id, portData) {
    return await this.request(`/ports/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(portData)
    })
  }

  async deletePort(id) {
    return await this.request(`/ports/${id}`, {
      method: 'DELETE'
    })
  }

  // Port Categories API endpoints
  async getPortCategories() {
    return await this.request('/port-categories')
  }

  async getPortCategory(id) {
    return await this.request(`/port-categories/${id}`)
  }

  async createPortCategory(categoryData) {
    return await this.request('/port-categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    })
  }

  async updatePortCategory(id, categoryData) {
    return await this.request(`/port-categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(categoryData)
    })
  }

  async deletePortCategory(id) {
    return await this.request(`/port-categories/${id}`, {
      method: 'DELETE'
    })
  }

  // Enquiries endpoints (no /api prefix)
  async getEnquiries() {
    return await this.request('/enquiries')
  }

  async createEnquiry(enquiryData) {
    return await this.request('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData)
    })
  }
}

export default new ApiService()

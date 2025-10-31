<template>
  <div class="section-container">
    <div class="section-header">
      <h2>Website Requests</h2>
      <div class="header-actions">
        <button @click="toggleInspector" class="btn btn-secondary">{{ showInspector ? 'Hide' : 'Inspect Response' }}</button>
        <button @click="loadData" :disabled="loading" class="btn btn-primary">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <div v-if="showInspector" class="inspector-card">
      <div class="inspector-header">
        <h3>Raw API Response Preview</h3>
        <div class="inspector-meta">
          <span>items: {{ rawResponse?.data?.length || 0 }}</span>
          <span v-if="rawResponse?.pagination">page: {{ rawResponse.pagination.page }} / {{ rawResponse.pagination.totalPages }}</span>
        </div>
      </div>
      <div class="inspector-body">
        <pre>{{ prettyRaw }}</pre>
      </div>
    </div>

    <div class="filters-bar">
      <input
        v-model="filters.search"
        @input="debouncedSearch"
        type="text"
        placeholder="Search by subdomain, domain, email..."
        class="filter-input"
      />
      <select v-model="filters.status" @change="loadData" class="filter-select">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="published">Published</option>
      </select>
    </div>

    <DataTable
      :columns="columns"
      :data="websites"
      :loading="loading"
      :actions="actions"
      @action="handleAction"
    >
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
      <template #cell-user.email="{ row }">{{ row.user?.email || '-' }}</template>
      <template #cell-template.name="{ row }">{{ row.template?.name || '-' }}</template>
      <template #cell-requestedAt="{ value }">{{ formatDate(value) }}</template>
      <template #cell-publishedAt="{ value }">{{ formatDate(value) }}</template>
      <template #cell-accentColor="{ value }">
        <span class="color-chip" :style="{ backgroundColor: value }"></span>
        <span>{{ value }}</span>
      </template>
      <template #cell-enableBooking="{ value }"><StatusBadge :status="value ? 'success' : 'secondary'" :label="value ? 'Yes' : 'No'" /></template>
      <template #cell-showGallery="{ value }"><StatusBadge :status="value ? 'success' : 'secondary'" :label="value ? 'Yes' : 'No'" /></template>
      <template #cell-showMeasurements="{ value }"><StatusBadge :status="value ? 'success' : 'secondary'" :label="value ? 'Yes' : 'No'" /></template>
    </DataTable>

    <Pagination
      v-if="pagination"
      :current-page="filters.page"
      :total-pages="pagination.totalPages"
      :total="pagination.total"
      @page-change="changePage"
    />

    <!-- View Modal -->
    <Modal v-model:show="showViewModal" title="Website Details" :show-footer="false">
      <div v-if="selectedWebsite" class="details-container">
        <div class="detail-row"><span class="detail-label">ID:</span><span class="detail-value">{{ selectedWebsite.id }}</span></div>
        <div class="detail-row"><span class="detail-label">Subdomain:</span><span class="detail-value">{{ selectedWebsite.subdomain }}</span></div>
        <div class="detail-row"><span class="detail-label">Full Domain:</span><span class="detail-value">{{ selectedWebsite.fullDomain }}</span></div>
        <div class="detail-row"><span class="detail-label">Public URL:</span><span class="detail-value">{{ selectedWebsite.publicConfigUrl }}</span></div>
        <div class="detail-row"><span class="detail-label">Status:</span><StatusBadge :status="selectedWebsite.status" /></div>
        <div class="detail-row"><span class="detail-label">Accent Color:</span><span class="color-chip" :style="{ backgroundColor: selectedWebsite.accentColor }"></span> <span class="detail-value">{{ selectedWebsite.accentColor }}</span></div>
        <div class="detail-row"><span class="detail-label">Enable Booking:</span><StatusBadge :status="selectedWebsite.enableBooking ? 'success' : 'secondary'" :label="selectedWebsite.enableBooking ? 'Yes' : 'No'" /></div>
        <div class="detail-row"><span class="detail-label">Show Gallery:</span><StatusBadge :status="selectedWebsite.showGallery ? 'success' : 'secondary'" :label="selectedWebsite.showGallery ? 'Yes' : 'No'" /></div>
        <div class="detail-row"><span class="detail-label">Show Measurements:</span><StatusBadge :status="selectedWebsite.showMeasurements ? 'success' : 'secondary'" :label="selectedWebsite.showMeasurements ? 'Yes' : 'No'" /></div>
        <div class="detail-row"><span class="detail-label">Custom Name:</span><span class="detail-value">{{ selectedWebsite.customName || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Custom About:</span><span class="detail-value">{{ selectedWebsite.customAbout || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Custom Email:</span><span class="detail-value">{{ selectedWebsite.customEmail || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Requested At:</span><span class="detail-value">{{ formatDate(selectedWebsite.requestedAt) }}</span></div>
        <div class="detail-row"><span class="detail-label">Completed At:</span><span class="detail-value">{{ formatDate(selectedWebsite.completedAt) }}</span></div>
        <div class="detail-row"><span class="detail-label">Published At:</span><span class="detail-value">{{ formatDate(selectedWebsite.publishedAt) }}</span></div>
        <div class="detail-divider">Relations</div>
        <div class="detail-row"><span class="detail-label">User:</span><span class="detail-value">{{ selectedWebsite.user?.email || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Template:</span><span class="detail-value">{{ selectedWebsite.template?.name || '-' }}</span></div>
      </div>
    </Modal>

    <!-- Update Status Modal -->
    <Modal
      v-model:show="showStatusModal"
      title="Update Website Status"
      @confirm="updateStatus"
    >
      <FormSelect
        v-model="statusForm.status"
        label="Status"
        :options="[
          { value: 'pending', label: 'Pending' },
          { value: 'in_progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
          { value: 'published', label: 'Published' }
        ]"
        :required="true"
      />
      <FormInput
        v-model="statusForm.notes"
        label="Notes (optional)"
      />
    </Modal>
  </div>
</template>

<script>
import modelsApi from '../../../services/modelsApi.js'
import DataTable from '../shared/DataTable.vue'
import Modal from '../shared/Modal.vue'
import StatusBadge from '../shared/StatusBadge.vue'
import FormSelect from '../shared/FormSelect.vue'
import FormInput from '../shared/FormInput.vue'
import Pagination from '../shared/Pagination.vue'

export default {
  name: 'WebsitesSection',
  components: {
    DataTable,
    Modal,
    StatusBadge,
    FormSelect,
    FormInput,
    Pagination
  },
  data() {
    return {
      loading: false,
      websites: [],
      pagination: null,
      rawResponse: null,
      showInspector: false,
      filters: {
        page: 1,
        limit: 20,
        search: '',
        status: ''
      },
      selectedWebsite: null,
      showViewModal: false,
      showStatusModal: false,
      statusForm: { status: '', notes: '' },
      debounceTimer: null,
      columns: [
        { key: 'subdomain', label: 'Subdomain' },
        { key: 'fullDomain', label: 'Full Domain' },
        { key: 'status', label: 'Status' },
        { key: 'template.name', label: 'Template' },
        { key: 'user.email', label: 'User Email' },
        { key: 'requestedAt', label: 'Requested' },
        { key: 'publishedAt', label: 'Published' },
        { key: 'accentColor', label: 'Color' },
        { key: 'enableBooking', label: 'Booking' },
        { key: 'showGallery', label: 'Gallery' }
      ],
      actions: [
        { key: 'view', label: 'View', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', variant: 'primary', iconOnly: true },
        { key: 'update', label: 'Update Status', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', variant: 'success', iconOnly: true },
        { key: 'gotoUser', label: 'Open User', icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 7a4 4 0 110-8 4 4 0 010 8zm7 13H5a2 2 0 01-2-2v-2a6 6 0 0112 0v2a2 2 0 01-2 2z', variant: 'primary', iconOnly: true }
      ]
    }
  },
  computed: {
    prettyRaw() {
      return this.rawResponse ? JSON.stringify(this.rawResponse, null, 2) : 'No data yet. Click Refresh.'
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    formatDate(v){ if(!v) return '-'; try{ return new Date(v).toLocaleString() } catch(e){ return String(v) } },
    toggleInspector(){ this.showInspector = !this.showInspector },
    async loadData() {
      this.loading = true
      try {
        const params = { ...this.filters }
        if (!params.search) delete params.search
        if (!params.status) delete params.status
        
        const response = await modelsApi.getWebsiteRequests(params)
        this.rawResponse = response
        console.log('[WebsitesSection] /api/admin/website-requests response:', response)
        this.websites = response.data || []
        this.pagination = response.pagination
      } catch (error) {
        alert('Error loading websites: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    debouncedSearch() {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.filters.page = 1
        this.loadData()
      }, 500)
    },
    changePage(page) {
      this.filters.page = page
      this.loadData()
    },
    async handleAction(action, website) {
      this.selectedWebsite = website
      switch (action) {
        case 'view':
          try {
            const fullWebsite = await modelsApi.getWebsiteRequest(website.id)
            this.selectedWebsite = fullWebsite
            this.showViewModal = true
          } catch (error) {
            alert('Error loading website: ' + error.message)
          }
          break
        case 'update':
          this.statusForm = { status: website.status, notes: '' }
          this.showStatusModal = true
          break
        case 'gotoUser':
          try {
            const email = website.user?.email
            if (email) localStorage.setItem('models_users_search', email)
            this.$router.push('/models')
          } catch(e) { this.$router.push('/models') }
          break
      }
    },
    async updateStatus() {
      try {
        await modelsApi.updateWebsiteRequestStatus(this.selectedWebsite.id, this.statusForm)
        this.showStatusModal = false
        await this.loadData()
        alert('Status updated successfully')
      } catch (error) {
        alert('Error updating status: ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.section-container { display: flex; flex-direction: column; gap: 1.5rem; }
.section-header { display: flex; align-items: center; justify-content: space-between; }
.header-actions { display:flex; gap:.5rem }
.section-header h2 { font-size: 1.5rem; font-weight: 600; color: #1F2937; margin: 0; font-family: 'Montserrat', sans-serif; }
.btn { display:inline-flex; align-items:center; gap:.5rem; padding:.625rem 1.25rem; border-radius:.5rem; font-weight:500; cursor:pointer; transition:all .2s; border:none; font-family:'Open Sans',sans-serif; font-size:.875rem }
.btn-primary { background-color:#4F46E5; color:white }
.btn-secondary { background-color:#F3F4F6; color:#374151 }
.btn-secondary:hover { background-color:#E5E7EB }
.filters-bar { display: flex; gap: 1rem; flex-wrap: wrap; }
.filter-input, .filter-select { padding: 0.625rem 0.875rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; font-size: 0.875rem; font-family: 'Open Sans', sans-serif; }
.filter-input { flex: 1; min-width: 200px; }
.filter-select { min-width: 150px; }
.filter-input:focus, .filter-select:focus { outline: none; border-color: #4F46E5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
.details-container { display:flex; flex-direction:column; gap: .75rem }
.detail-row { display:flex; align-items:center; gap:1rem; padding:.5rem 0; border-bottom:1px solid #E5E7EB }
.detail-label { font-weight:600; color:#6B7280; min-width:140px; font-family:'Open Sans',sans-serif; font-size:.875rem }
.detail-value { color:#1F2937; font-family:'Open Sans',sans-serif }
.inspector-card { background: white; border: 1px solid #E5E7EB; border-radius: .75rem; overflow: hidden }
.inspector-header { display:flex; align-items:center; justify-content:space-between; padding: .75rem 1rem; background:#F9FAFB; border-bottom:1px solid #E5E7EB }
.inspector-header h3 { margin:0; font-size:1rem; font-weight:600; color:#1F2937; font-family:'Montserrat',sans-serif }
.inspector-meta { display:flex; gap:1rem; color:#6B7280; font-size:.875rem; font-family:'Open Sans',sans-serif }
.inspector-body { max-height: 320px; overflow:auto }
.inspector-body pre { margin:0; padding:1rem; font-size:.8rem; color:#374151; font-family:'Monaco','Menlo','Ubuntu Mono',monospace }
.color-chip { display:inline-block; width: 14px; height: 14px; border-radius: 3px; border: 1px solid #E5E7EB; margin-right: .5rem; vertical-align: middle }
</style>

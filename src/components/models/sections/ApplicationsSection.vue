<template>
  <div class="section-container">
    <div class="section-header">
      <h2>Applications</h2>
      <button @click="loadData" :disabled="loading" class="btn btn-primary">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Refresh
      </button>
    </div>

    <div class="filters-bar">
      <select v-model="filters.status" @change="loadData" class="filter-select">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <input
        v-model="filters.search"
        @input="debouncedSearch"
        type="text"
        placeholder="Search by email or name..."
        class="filter-input"
      />
    </div>

    <DataTable
      :columns="columns"
      :data="applications"
      :loading="loading"
      :actions="actions"
      @action="handleAction"
    />

    <Pagination
      v-if="pagination"
      :current-page="filters.page"
      :total-pages="pagination.totalPages"
      :total="pagination.total"
      @page-change="changePage"
    />

    <!-- View Modal -->
    <Modal v-model:show="showViewModal" title="Application Details" :show-footer="false">
      <div v-if="selectedItem" class="details-container">
        <div class="detail-row"><span class="detail-label">Email:</span><span class="detail-value">{{ selectedItem.email }}</span></div>
        <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">{{ selectedItem.firstName }} {{ selectedItem.lastName }}</span></div>
        <div class="detail-row"><span class="detail-label">Status:</span><StatusBadge :status="selectedItem.status" /></div>
      </div>
    </Modal>

    <!-- Update Status Modal -->
    <Modal v-model:show="showStatusModal" title="Update Status" @confirm="updateStatus">
      <FormSelect
        v-model="statusForm.status"
        label="Status"
        :options="[
          { value: 'pending', label: 'Pending' },
          { value: 'completed', label: 'Completed' },
          { value: 'failed', label: 'Failed' },
          { value: 'cancelled', label: 'Cancelled' }
        ]"
        :required="true"
      />
      <FormInput v-model="statusForm.notes" label="Notes (optional)" />
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
  name: 'ApplicationsSection',
  components: { DataTable, Modal, StatusBadge, FormSelect, FormInput, Pagination },
  data() {
    return {
      loading: false,
      applications: [],
      pagination: null,
      filters: { page: 1, limit: 20, status: '', search: '' },
      columns: [
        { key: 'email', label: 'Email' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'status', label: 'Status' }
      ],
      actions: [
        { key: 'view', label: 'View', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', variant: 'primary', iconOnly: true },
        { key: 'update', label: 'Update', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', variant: 'success', iconOnly: true }
      ],
      selectedItem: null,
      showViewModal: false,
      showStatusModal: false,
      statusForm: { status: '', notes: '' },
      debounceTimer: null
    }
  },
  async mounted() { await this.loadData() },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const params = { ...this.filters }
        if (!params.status) delete params.status
        if (!params.search) delete params.search
        const res = await modelsApi.getApplications(params)
        this.applications = res.data || []
        this.pagination = res.pagination
      } finally { this.loading = false }
    },
    debouncedSearch() { clearTimeout(this.debounceTimer); this.debounceTimer = setTimeout(() => { this.filters.page = 1; this.loadData() }, 500) },
    changePage(p) { this.filters.page = p; this.loadData() },
    async handleAction(action, row) {
      this.selectedItem = row
      if (action === 'view') {
        try { this.selectedItem = await modelsApi.getApplication(row.id); this.showViewModal = true } catch (e) { alert('Failed: ' + e.message) }
      } else if (action === 'update') {
        this.statusForm = { status: row.status, notes: '' }
        this.showStatusModal = true
      }
    },
    async updateStatus() {
      try {
        await modelsApi.updateApplicationStatus(this.selectedItem.id, this.statusForm)
        this.showStatusModal = false
        await this.loadData()
        alert('Status updated')
      } catch (e) { alert('Failed: ' + e.message) }
    }
  }
}
</script>

<style scoped>
.section-container { display: flex; flex-direction: column; gap: 1.5rem; }
.section-header { display: flex; align-items: center; justify-content: space-between; }
.section-header h2 { font-size: 1.5rem; font-weight: 600; color: #1F2937; margin: 0; font-family: 'Montserrat', sans-serif; }
.btn { display: inline-flex; align-items: center; gap: .5rem; padding: .625rem 1.25rem; border-radius: .5rem; font-weight: 500; cursor: pointer; transition: all .2s; border: none; font-family: 'Open Sans', sans-serif; font-size: .875rem; }
.btn-primary { background-color: #4F46E5; color: white; }
.btn-primary:hover:not(:disabled){ background-color:#3730A3; }
.filters-bar { display:flex; gap:1rem; flex-wrap:wrap; }
.filter-input, .filter-select{ padding:.625rem .875rem; border:1px solid #D1D5DB; border-radius:.5rem; font-size:.875rem; font-family:'Open Sans',sans-serif; }
.filter-input{ flex:1; min-width:200px; }
.details-container{ display:flex; flex-direction:column; gap:1rem; }
.detail-row{ display:flex; align-items:center; gap:1rem; padding:.75rem 0; border-bottom:1px solid #E5E7EB; }
.detail-row:last-child{ border-bottom:none; }
.detail-label{ font-weight:600; color:#6B7280; min-width:120px; font-family:'Open Sans',sans-serif; font-size:.875rem; }
.detail-value{ color:#1F2937; font-family:'Open Sans',sans-serif; }
</style>

<template>
  <div class="section-container">
    <div class="section-header">
      <h2>Bookings</h2>
      <button @click="loadData" :disabled="loading" class="btn btn-primary">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Refresh
      </button>
    </div>

    <div class="filters-bar">
      <input v-model="filters.search" @input="debouncedSearch" type="text" placeholder="Search by title, company..." class="filter-input" />
      <select v-model="filters.status" @change="loadData" class="filter-select">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <DataTable
      :columns="columns"
      :data="bookings"
      :loading="loading"
      :actions="actions"
      @action="handleAction"
    />

    <Pagination v-if="pagination" :current-page="filters.page" :total-pages="pagination.totalPages" :total="pagination.total" @page-change="changePage" />

    <!-- View Modal -->
    <Modal v-model:show="showViewModal" title="Booking Details" :show-footer="false">
      <div v-if="selected" class="details-container">
        <div class="detail-row"><span class="detail-label">Title:</span><span class="detail-value">{{ selected.title }}</span></div>
        <div class="detail-row"><span class="detail-label">Company:</span><span class="detail-value">{{ selected.company }}</span></div>
        <div class="detail-row"><span class="detail-label">Status:</span><StatusBadge :status="selected.status" /></div>
      </div>
    </Modal>

    <!-- Update Status Modal -->
    <Modal v-model:show="showStatusModal" title="Update Status" @confirm="updateStatus">
      <FormSelect v-model="statusForm.status" label="Status" :options="statusOptions" :required="true" />
    </Modal>

    <!-- Delete -->
    <Modal v-model:show="showDeleteModal" title="Delete Booking" confirm-text="Delete" @confirm="confirmDelete">
      <p>Delete booking <strong>{{ selected?.title }}</strong>? This cannot be undone.</p>
    </Modal>
  </div>
</template>

<script>
import modelsApi from '../../../services/modelsApi.js'
import DataTable from '../shared/DataTable.vue'
import Modal from '../shared/Modal.vue'
import StatusBadge from '../shared/StatusBadge.vue'
import FormSelect from '../shared/FormSelect.vue'
import Pagination from '../shared/Pagination.vue'

export default {
  name: 'BookingsSection',
  components: { DataTable, Modal, StatusBadge, FormSelect, Pagination },
  data() {
    return {
      loading: false,
      bookings: [],
      pagination: null,
      filters: { page: 1, limit: 20, search: '', status: '' },
      columns: [
        { key: 'title', label: 'Title' },
        { key: 'company', label: 'Company' },
        { key: 'status', label: 'Status' }
      ],
      actions: [
        { key: 'view', label: 'View', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', variant: 'primary', iconOnly: true },
        { key: 'update', label: 'Update', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', variant: 'success', iconOnly: true },
        { key: 'delete', label: 'Delete', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', variant: 'danger', iconOnly: true }
      ],
      selected: null,
      showViewModal: false,
      showStatusModal: false,
      showDeleteModal: false,
      statusForm: { status: '' },
      statusOptions: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'completed', label: 'Completed' }
      ],
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
        const res = await modelsApi.getBookings(params)
        this.bookings = res.data || []
        this.pagination = res.pagination
      } finally { this.loading = false }
    },
    debouncedSearch(){ clearTimeout(this.debounceTimer); this.debounceTimer = setTimeout(()=>{ this.filters.page=1; this.loadData() },500) },
    changePage(p){ this.filters.page=p; this.loadData() },
    async handleAction(action, row){
      this.selected = row
      if(action==='view') { try{ this.selected = await modelsApi.getBooking(row.id); this.showViewModal=true } catch(e){ alert('Failed: '+e.message) } }
      else if(action==='update'){ this.statusForm={ status: row.status }; this.showStatusModal=true }
      else if(action==='delete'){ this.showDeleteModal=true }
    },
    async updateStatus(){ try{ await modelsApi.updateBookingStatus(this.selected.id, this.statusForm); this.showStatusModal=false; await this.loadData(); alert('Status updated') } catch(e){ alert('Failed: '+e.message) } },
    async confirmDelete(){ try{ await modelsApi.deleteBooking(this.selected.id); this.showDeleteModal=false; await this.loadData(); alert('Deleted') } catch(e){ alert('Failed: '+e.message) } }
  }
}
</script>

<style scoped>
.section-container { display:flex; flex-direction:column; gap:1.5rem }
.section-header { display:flex; align-items:center; justify-content:space-between }
.section-header h2 { font-size:1.5rem; font-weight:600; color:#1F2937; margin:0; font-family:'Montserrat',sans-serif }
.btn { display:inline-flex; align-items:center; gap:.5rem; padding:.625rem 1.25rem; border-radius:.5rem; font-weight:500; cursor:pointer; transition:all .2s; border:none; font-family:'Open Sans',sans-serif; font-size:.875rem }
.btn-primary { background-color:#4F46E5; color:white }
.btn-primary:hover:not(:disabled){ background-color:#3730A3 }
.filters-bar{ display:flex; gap:1rem; flex-wrap:wrap }
.filter-input,.filter-select{ padding:.625rem .875rem; border:1px solid #D1D5DB; border-radius:.5rem; font-size:.875rem; font-family:'Open Sans',sans-serif }
.filter-input{ flex:1; min-width:200px }
.details-container{ display:flex; flex-direction:column; gap:1rem }
.detail-row{ display:flex; align-items:center; gap:1rem; padding:.75rem 0; border-bottom:1px solid #E5E7EB }
.detail-label{ font-weight:600; color:#6B7280; min-width:120px; font-family:'Open Sans',sans-serif; font-size:.875rem }
.detail-value{ color:#1F2937; font-family:'Open Sans',sans-serif }
</style>

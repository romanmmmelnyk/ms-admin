<template>
  <div class="section-container">
    <div class="section-header">
      <h2>Billing Management</h2>
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
        <option value="active">Active</option>
        <option value="cancelled">Cancelled</option>
        <option value="past_due">Past Due</option>
        <option value="expired">Expired</option>
      </select>
      <input
        v-model="filters.search"
        @input="debouncedSearch"
        type="text"
        placeholder="Search by customer ID, subscription..."
        class="filter-input"
      />
    </div>

    <DataTable
      :columns="columns"
      :data="billings"
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
    <Modal v-model:show="showViewModal" title="Billing Details" :show-footer="false">
      <div v-if="selectedBilling" class="details-container">
        <div class="detail-row">
          <span class="detail-label">Customer ID:</span>
          <span class="detail-value">{{ selectedBilling.customerId }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Subscription ID:</span>
          <span class="detail-value">{{ selectedBilling.subscriptionId }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <StatusBadge :status="selectedBilling.status" />
        </div>
        <div v-if="selectedBilling.currentPeriodStart" class="detail-row">
          <span class="detail-label">Period Start:</span>
          <span class="detail-value">{{ formatDate(selectedBilling.currentPeriodStart) }}</span>
        </div>
      </div>
    </Modal>

    <!-- Update Status Modal -->
    <Modal
      v-model:show="showStatusModal"
      title="Update Billing Status"
      @confirm="updateStatus"
    >
      <FormSelect
        v-model="statusForm.status"
        label="Status"
        :options="[
          { value: 'active', label: 'Active' },
          { value: 'cancelled', label: 'Cancelled' },
          { value: 'past_due', label: 'Past Due' },
          { value: 'expired', label: 'Expired' }
        ]"
        :required="true"
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
import Pagination from '../shared/Pagination.vue'

export default {
  name: 'BillingSection',
  components: {
    DataTable,
    Modal,
    StatusBadge,
    FormSelect,
    Pagination
  },
  data() {
    return {
      loading: false,
      billings: [],
      pagination: null,
      filters: {
        page: 1,
        limit: 20,
        status: '',
        search: ''
      },
      selectedBilling: null,
      showViewModal: false,
      showStatusModal: false,
      statusForm: { status: '' },
      debounceTimer: null,
      columns: [
        { key: 'customerId', label: 'Customer ID' },
        { key: 'subscriptionId', label: 'Subscription ID' },
        { key: 'status', label: 'Status' }
      ],
      actions: [
        {
          key: 'view',
          label: 'View',
          icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
          variant: 'primary',
          iconOnly: true
        },
        {
          key: 'update',
          label: 'Update Status',
          icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
          variant: 'success',
          iconOnly: true
        }
      ]
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const params = { ...this.filters }
        if (!params.status) delete params.status
        if (!params.search) delete params.search
        
        const response = await modelsApi.getBillings(params)
        this.billings = response.data || []
        this.pagination = response.pagination
      } catch (error) {
        alert('Error loading billings: ' + error.message)
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
    async handleAction(action, billing) {
      this.selectedBilling = billing
      switch (action) {
        case 'view':
          try {
            const fullBilling = await modelsApi.getBilling(billing.id)
            this.selectedBilling = fullBilling
            this.showViewModal = true
          } catch (error) {
            alert('Error loading billing: ' + error.message)
          }
          break
        case 'update':
          this.statusForm = { status: billing.status }
          this.showStatusModal = true
          break
      }
    },
    async updateStatus() {
      try {
        await modelsApi.updateBillingStatus(this.selectedBilling.id, this.statusForm)
        this.showStatusModal = false
        await this.loadData()
        alert('Status updated successfully')
      } catch (error) {
        alert('Error updating status: ' + error.message)
      }
    },
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style scoped>
.section-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #4F46E5;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3730A3;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn svg {
  width: 1rem;
  height: 1rem;
}

.filters-bar {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-input,
.filter-select {
  padding: 0.625rem 0.875rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-family: 'Open Sans', sans-serif;
}

.filter-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  min-width: 150px;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.details-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #E5E7EB;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #6B7280;
  min-width: 150px;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
}

.detail-value {
  color: #1F2937;
  font-family: 'Open Sans', sans-serif;
}
</style>

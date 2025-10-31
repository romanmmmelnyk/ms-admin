<template>
  <div class="section-container">
    <div class="section-header">
      <h2>Users Management</h2>
      <div class="header-actions">
        <button @click="toggleInspector" class="btn btn-secondary">
          {{ showInspector ? 'Hide' : 'Inspect Response' }}
        </button>
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
        placeholder="Search by email, name..."
        class="filter-input"
      />
      <select v-model="filters.isActive" @change="loadData" class="filter-select">
        <option value="">All Status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <select v-model="filters.isAdmin" @change="loadData" class="filter-select">
        <option value="">All Roles</option>
        <option value="true">Admin</option>
        <option value="false">User</option>
      </select>
    </div>

    <DataTable
      :columns="columns"
      :data="users"
      :loading="loading"
      :actions="actions"
      @action="handleAction"
    >
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'active' : 'inactive'" />
      </template>
      <template #cell-isAdmin="{ value }">
        <StatusBadge :status="value ? 'active' : 'secondary'" :label="value ? 'Admin' : 'User'" />
      </template>
      <template #cell-profile.firstName="{ row }">
        {{ row.profile?.firstName || '-' }}
      </template>
      <template #cell-profile.lastName="{ row }">
        {{ row.profile?.lastName || '-' }}
      </template>
      <template #cell-lastLogin="{ value }">
        {{ formatDate(value) }}
      </template>
      <template #cell-billing.status="{ row }">
        <StatusBadge :status="row.billing?.status || 'secondary'" :label="row.billing?.status || '-'" />
      </template>
      <template #cell-_count.bookings="{ row }">{{ row._count?.bookings ?? 0 }}</template>
      <template #cell-_count.media="{ row }">{{ row._count?.media ?? 0 }}</template>
      <template #cell-_count.notifications="{ row }">{{ row._count?.notifications ?? 0 }}</template>
    </DataTable>

    <Pagination
      v-if="pagination"
      :current-page="filters.page"
      :total-pages="pagination.totalPages"
      :total="pagination.total"
      @page-change="changePage"
    />

    <!-- View Modal -->
    <Modal v-model:show="showViewModal" :title="'User Details'" :show-footer="false">
      <div v-if="selectedUser" class="user-details">
        <div class="detail-row"><span class="detail-label">ID:</span><span class="detail-value">{{ selectedUser.id }}</span></div>
        <div class="detail-row"><span class="detail-label">Email:</span><span class="detail-value">{{ selectedUser.email }}</span></div>
        <div class="detail-row"><span class="detail-label">Provider:</span><span class="detail-value">{{ selectedUser.provider }}</span></div>
        <div class="detail-row"><span class="detail-label">Tenant ID:</span><span class="detail-value">{{ selectedUser.tenantId || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Active:</span><StatusBadge :status="selectedUser.isActive ? 'active' : 'inactive'" /></div>
        <div class="detail-row"><span class="detail-label">Admin:</span><StatusBadge :status="selectedUser.isAdmin ? 'active' : 'secondary'" :label="selectedUser.isAdmin ? 'Yes' : 'No'" /></div>
        <div class="detail-row"><span class="detail-label">2FA:</span><StatusBadge :status="selectedUser.twoFactorEnabled ? 'success' : 'secondary'" :label="selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'" /></div>
        <div class="detail-row"><span class="detail-label">Last Login:</span><span class="detail-value">{{ formatDate(selectedUser.lastLogin) }}</span></div>
        <div class="detail-row"><span class="detail-label">Created:</span><span class="detail-value">{{ formatDate(selectedUser.createdAt) }}</span></div>
        <div class="detail-row"><span class="detail-label">Updated:</span><span class="detail-value">{{ formatDate(selectedUser.updatedAt) }}</span></div>

        <div class="detail-divider">Profile</div>
        <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">{{ selectedUser.profile?.firstName }} {{ selectedUser.profile?.lastName }}</span></div>
        <div class="detail-row"><span class="detail-label">Phone:</span><span class="detail-value">{{ selectedUser.profile?.phone || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Address:</span><span class="detail-value">{{ selectedUser.profile?.address || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">City:</span><span class="detail-value">{{ selectedUser.profile?.city || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Country:</span><span class="detail-value">{{ selectedUser.profile?.country || '-' }}</span></div>

        <div class="detail-divider">Billing</div>
        <div class="detail-row"><span class="detail-label">Stripe Customer:</span><span class="detail-value">{{ selectedUser.billing?.stripeCustomerId || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Stripe Subscription:</span><span class="detail-value">{{ selectedUser.billing?.stripeSubscriptionId || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Type:</span><span class="detail-value">{{ selectedUser.billing?.billingType || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">Next Billing:</span><span class="detail-value">{{ formatDate(selectedUser.billing?.nextBillingDate) }}</span></div>
        <div class="detail-row"><span class="detail-label">Status:</span><StatusBadge :status="selectedUser.billing?.status || 'secondary'" :label="selectedUser.billing?.status || '-'" /></div>
        <div class="detail-row"><span class="detail-label">Amounts:</span><span class="detail-value">Init {{ selectedUser.billing?.initialAmount ?? '-' }} | Rec {{ selectedUser.billing?.recurringAmount ?? '-' }} | Setup {{ selectedUser.billing?.setupFee ?? '-' }} | Custom {{ selectedUser.billing?.customDesignFee ?? '-' }} ({{ selectedUser.billing?.currency?.toUpperCase?.() || '' }})</span></div>

        <div class="detail-divider">Counts</div>
        <div class="detail-row"><span class="detail-label">Bookings:</span><span class="detail-value">{{ selectedUser._count?.bookings ?? 0 }}</span></div>
        <div class="detail-row"><span class="detail-label">Media:</span><span class="detail-value">{{ selectedUser._count?.media ?? 0 }}</span></div>
        <div class="detail-row"><span class="detail-label">Notifications:</span><span class="detail-value">{{ selectedUser._count?.notifications ?? 0 }}</span></div>
      </div>
    </Modal>

    <!-- Edit Modal -->
    <Modal
      v-model:show="showEditModal"
      title="Edit User"
      @confirm="saveUser"
    >
      <div v-if="editForm">
        <FormInput
          v-model="editForm.email"
          label="Email"
          type="email"
          :required="true"
        />
        <FormSelect
          v-model="editForm.isActive"
          label="Status"
          :options="[
            { value: true, label: 'Active' },
            { value: false, label: 'Inactive' }
          ]"
        />
        <FormSelect
          v-model="editForm.isAdmin"
          label="Role"
          :options="[
            { value: true, label: 'Admin' },
            { value: false, label: 'User' }
          ]"
        />
        <FormInput
          v-model="editForm.password"
          label="New Password (leave empty to keep current)"
          type="password"
        />
      </div>
    </Modal>

    <!-- Delete Confirmation -->
    <Modal
      v-model:show="showDeleteModal"
      title="Delete User"
      confirm-text="Delete"
      @confirm="confirmDelete"
    >
      <p>Are you sure you want to delete user <strong>{{ selectedUser?.email }}</strong>? This action cannot be undone.</p>
    </Modal>
  </div>
</template>

<script>
import modelsApi from '../../../services/modelsApi.js'
import DataTable from '../shared/DataTable.vue'
import Modal from '../shared/Modal.vue'
import StatusBadge from '../shared/StatusBadge.vue'
import FormInput from '../shared/FormInput.vue'
import FormSelect from '../shared/FormSelect.vue'
import Pagination from '../shared/Pagination.vue'

export default {
  name: 'UsersSection',
  components: {
    DataTable,
    Modal,
    StatusBadge,
    FormInput,
    FormSelect,
    Pagination
  },
  data() {
    return {
      loading: false,
      error: null,
      users: [],
      pagination: null,
      rawResponse: null,
      showInspector: false,
      filters: {
        page: 1,
        limit: 20,
        search: '',
        isActive: '',
        isAdmin: ''
      },
      selectedUser: null,
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      editForm: null,
      debounceTimer: null,
      columns: [
        { key: 'email', label: 'Email' },
        { key: 'profile.firstName', label: 'First Name' },
        { key: 'profile.lastName', label: 'Last Name' },
        { key: 'isActive', label: 'Status' },
        { key: 'isAdmin', label: 'Role' },
        { key: 'lastLogin', label: 'Last Login' },
        { key: 'billing.status', label: 'Billing' },
        { key: '_count.bookings', label: 'Bookings' },
        { key: '_count.media', label: 'Media' },
        { key: '_count.notifications', label: 'Notifications' }
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
          key: 'edit',
          label: 'Edit',
          icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
          variant: 'success',
          iconOnly: true
        },
        {
          key: 'delete',
          label: 'Delete',
          icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
          variant: 'danger',
          iconOnly: true
        }
      ]
    }
  },
  computed: {
    prettyRaw() {
      return this.rawResponse ? JSON.stringify(this.rawResponse, null, 2) : 'No data yet. Click Refresh.'
    }
  },
  async mounted() {
    // Apply preset search from Websites section navigation
    try {
      const preset = localStorage.getItem('models_users_search')
      if (preset) {
        this.filters.search = preset
        localStorage.removeItem('models_users_search')
      }
    } catch (e) {}
    await this.loadData()
  },
  methods: {
    formatDate(value) {
      if (!value) return '-'
      try {
        return new Date(value).toLocaleString()
      } catch (e) { return String(value) }
    },
    toggleInspector() {
      this.showInspector = !this.showInspector
    },
    async loadData() {
      this.loading = true
      this.error = null
      try {
        const params = { ...this.filters }
        if (!params.search) delete params.search
        if (!params.isActive) delete params.isActive
        if (!params.isAdmin) delete params.isAdmin
        
        const response = await modelsApi.getUsers(params)
        // Save and log the raw response for inspection
        this.rawResponse = response
        console.log('[UsersSection] /api/admin/users response:', response)
        
        this.users = response.data || []
        this.pagination = response.pagination
      } catch (error) {
        this.error = error.message
        console.error('Error loading users:', error)
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
    async handleAction(action, user) {
      this.selectedUser = user
      switch (action) {
        case 'view':
          try {
            const fullUser = await modelsApi.getUser(user.id)
            this.selectedUser = fullUser
            this.showViewModal = true
          } catch (error) {
            alert('Error loading user details: ' + error.message)
          }
          break
        case 'edit':
          this.editForm = {
            email: user.email,
            isActive: user.isActive,
            isAdmin: user.isAdmin,
            password: ''
          }
          this.showEditModal = true
          break
        case 'delete':
          this.showDeleteModal = true
          break
      }
    },
    async saveUser() {
      try {
        await modelsApi.updateUser(this.selectedUser.id, this.editForm)
        this.showEditModal = false
        await this.loadData()
        alert('User updated successfully')
      } catch (error) {
        alert('Error updating user: ' + error.message)
      }
    },
    async confirmDelete() {
      try {
        await modelsApi.deleteUser(this.selectedUser.id)
        this.showDeleteModal = false
        await this.loadData()
        alert('User deleted successfully')
      } catch (error) {
        alert('Error deleting user: ' + error.message)
      }
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

.header-actions { display: flex; gap: .5rem }

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

.btn-primary { background-color: #4F46E5; color: white }
.btn-primary:hover:not(:disabled) { background-color: #3730A3 }
.btn-secondary { background-color: #F3F4F6; color: #374151 }
.btn-secondary:hover { background-color: #E5E7EB }

.inspector-card { background: white; border: 1px solid #E5E7EB; border-radius: .75rem; overflow: hidden }
.inspector-header { display:flex; align-items:center; justify-content:space-between; padding: .75rem 1rem; background:#F9FAFB; border-bottom:1px solid #E5E7EB }
.inspector-header h3 { margin:0; font-size:1rem; font-weight:600; color:#1F2937; font-family:'Montserrat',sans-serif }
.inspector-meta { display:flex; gap:1rem; color:#6B7280; font-size:.875rem; font-family:'Open Sans',sans-serif }
.inspector-body { max-height: 320px; overflow:auto }
.inspector-body pre { margin:0; padding:1rem; font-size:.8rem; color:#374151; font-family:'Monaco','Menlo','Ubuntu Mono',monospace }

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

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-divider { margin-top: 0.75rem; font-weight: 700; color: #111827; font-family:'Montserrat',sans-serif }

.detail-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #E5E7EB;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #6B7280;
  min-width: 140px;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
}

.detail-value {
  color: #1F2937;
  font-family: 'Open Sans', sans-serif;
}
</style>

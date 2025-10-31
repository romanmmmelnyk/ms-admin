<template>
  <div class="data-table-wrapper">
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              {{ column.label }}
            </th>
            <th v-if="actions.length > 0">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="columns.length + (actions.length > 0 ? 1 : 0)" class="loading-cell">
              <div class="loading-spinner"></div>
              Loading...
            </td>
          </tr>
          <tr v-else-if="!data || data.length === 0">
            <td :colspan="columns.length + (actions.length > 0 ? 1 : 0)" class="empty-cell">
              No data available
            </td>
          </tr>
          <tr v-else v-for="(row, index) in data" :key="getRowKey(row, index)">
            <td v-for="column in columns" :key="column.key">
              <slot :name="`cell-${column.key}`" :row="row" :value="getValue(row, column.key)">
                {{ formatValue(row, column.key) }}
              </slot>
            </td>
            <td v-if="actions.length > 0" class="actions-cell">
              <div class="actions">
                <button
                  v-for="action in actions"
                  :key="action.key"
                  @click="handleAction(action, row)"
                  :class="['action-btn', action.variant || 'secondary']"
                  :title="action.label"
                >
                  <svg v-if="action.icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon"></path>
                  </svg>
                  <span v-if="!action.iconOnly">{{ action.label }}</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: [String, Function],
      default: 'id'
    }
  },
  emits: ['action'],
  methods: {
    getValue(row, key) {
      return key.split('.').reduce((obj, k) => obj?.[k], row)
    },
    formatValue(row, key) {
      const value = this.getValue(row, key)
      if (value === null || value === undefined) return '-'
      if (typeof value === 'boolean') return value ? 'Yes' : 'No'
      return String(value)
    },
    getRowKey(row, index) {
      if (typeof this.rowKey === 'function') {
        return this.rowKey(row, index)
      }
      return row[this.rowKey] || index
    },
    handleAction(action, row) {
      this.$emit('action', action.key, row)
    }
  }
}
</script>

<style scoped>
.data-table-wrapper {
  overflow-x: auto;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  background: white;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Open Sans', sans-serif;
}

.data-table th {
  background-color: #F9FAFB;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #E5E7EB;
  font-family: 'Montserrat', sans-serif;
  white-space: nowrap;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  color: #1F2937;
  font-size: 0.875rem;
}

.data-table tbody tr:hover {
  background-color: #F9FAFB;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.loading-cell,
.empty-cell {
  text-align: center;
  padding: 3rem 1rem;
  color: #6B7280;
  font-size: 0.875rem;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #E5E7EB;
  border-top-color: #4F46E5;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 0.5rem;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.actions-cell {
  white-space: nowrap;
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Open Sans', sans-serif;
  background-color: #F3F4F6;
  color: #374151;
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.action-btn:hover {
  background-color: #E5E7EB;
}

.action-btn.primary {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.action-btn.primary:hover {
  background-color: #BFDBFE;
}

.action-btn.danger {
  background-color: #FEE2E2;
  color: #991B1B;
}

.action-btn.danger:hover {
  background-color: #FECACA;
}

.action-btn.success {
  background-color: #D1FAE5;
  color: #065F46;
}

.action-btn.success:hover {
  background-color: #A7F3D0;
}
</style>

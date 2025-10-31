<template>
  <span :class="['status-badge', variant]">
    {{ label || status }}
  </span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    }
  },
  computed: {
    variant() {
      const statusMap = {
        'pending': 'warning',
        'active': 'success',
        'completed': 'success',
        'published': 'success',
        'in_progress': 'primary',
        'cancelled': 'danger',
        'failed': 'danger',
        'confirmed': 'success',
        'past_due': 'warning',
        'expired': 'danger',
        'info': 'primary',
        'success': 'success',
        'warning': 'warning',
        'error': 'danger',
        'inactive': 'secondary'
      }
      return statusMap[this.status] || 'secondary'
    }
  }
}
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  text-transform: capitalize;
}

.status-badge.success {
  background-color: #D1FAE5;
  color: #065F46;
}

.status-badge.danger {
  background-color: #FEE2E2;
  color: #991B1B;
}

.status-badge.warning {
  background-color: #FEF3C7;
  color: #92400E;
}

.status-badge.primary {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.status-badge.secondary {
  background-color: #F3F4F6;
  color: #374151;
}
</style>

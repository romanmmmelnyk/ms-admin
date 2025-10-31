<template>
  <div class="form-group">
    <label v-if="label" :for="id" class="form-label">{{ label }}<span v-if="required" class="required">*</span></label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="['form-input', { error: error }]"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
    <span v-if="hint && !error" class="hint">{{ hint }}</span>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 11)}`
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-family: 'Open Sans', sans-serif;
}

.required {
  color: #DC2626;
  margin-left: 0.25rem;
}

.form-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-family: 'Open Sans', sans-serif;
  transition: all 0.2s;
  background-color: white;
}

.form-input:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-input:disabled {
  background-color: #F3F4F6;
  cursor: not-allowed;
  color: #9CA3AF;
}

.form-input.error {
  border-color: #DC2626;
}

.form-input.error:focus {
  border-color: #DC2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.error-message {
  display: block;
  font-size: 0.75rem;
  color: #DC2626;
  margin-top: 0.25rem;
  font-family: 'Open Sans', sans-serif;
}

.hint {
  display: block;
  font-size: 0.75rem;
  color: #6B7280;
  margin-top: 0.25rem;
  font-family: 'Open Sans', sans-serif;
}
</style>

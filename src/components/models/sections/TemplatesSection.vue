<template>
  <div class="section-container">
    <div class="section-header">
      <h2>Templates</h2>
      <div class="header-actions">
        <button @click="openCreate" class="btn btn-success">Create</button>
        <button @click="loadData" :disabled="loading" class="btn btn-primary">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <div class="filters-bar">
      <select v-model="filters.isActive" @change="loadData" class="filter-select">
        <option value="">All</option>
        <option :value="true">Active</option>
        <option :value="false">Inactive</option>
      </select>
    </div>

    <DataTable
      :columns="columns"
      :data="templates"
      :loading="loading"
      :actions="actions"
      @action="handleAction"
    >
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'success' : 'secondary'" :label="value ? 'Active' : 'Inactive'" />
      </template>
      <template #cell-createdAt="{ value }">{{ formatDate(value) }}</template>
      <template #cell-updatedAt="{ value }">{{ formatDate(value) }}</template>
      <template #cell-pdfUrl="{ value }">
        <a v-if="value" :href="value" target="_blank" rel="noopener" class="link">View PDF</a>
        <span v-else>-</span>
      </template>
    </DataTable>

    <!-- View Modal -->
    <Modal v-model:show="showViewModal" title="Template Details" :show-footer="false">
      <div v-if="selected" class="details-container">
        <div class="detail-row"><span class="detail-label">ID:</span><span class="detail-value">{{ selected.id }}</span></div>
        <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">{{ selected.name }}</span></div>
        <div class="detail-row"><span class="detail-label">Description:</span><span class="detail-value">{{ selected.description || '-' }}</span></div>
        <div class="detail-row"><span class="detail-label">PDF:</span>
          <a v-if="selected.pdfUrl" :href="selected.pdfUrl" target="_blank" rel="noopener" class="link">Open PDF</a>
          <span v-else>-</span>
        </div>
        <div class="detail-row"><span class="detail-label">Active:</span><StatusBadge :status="selected.isActive ? 'success' : 'secondary'" :label="selected.isActive ? 'Active' : 'Inactive'" /></div>
        <div class="detail-row"><span class="detail-label">Sort Order:</span><span class="detail-value">{{ selected.sortOrder }}</span></div>
        <div class="detail-row"><span class="detail-label">Created:</span><span class="detail-value">{{ formatDate(selected.createdAt) }}</span></div>
        <div class="detail-row"><span class="detail-label">Updated:</span><span class="detail-value">{{ formatDate(selected.updatedAt) }}</span></div>
      </div>
    </Modal>

    <!-- Create / Edit Modal -->
    <Modal v-model:show="showEditModal" :title="editMode ? 'Edit Template' : 'Create Template'" @confirm="saveTemplate">
      <FormInput v-model="form.name" label="Name" :required="true" />
      <FormInput v-model="form.description" label="Description" />
      <FormInput v-model="form.pdfUrl" label="PDF URL" :required="true" />
      <div class="upload-row">
        <label class="form-label">Upload PDF</label>
        <input type="file" accept="application/pdf" @change="onFileChange" />
        <button class="btn btn-secondary" :disabled="!selectedFile || uploading" @click.prevent="uploadPdf">{{ uploading ? 'Uploading...' : 'Upload & Link' }}</button>
      </div>
      <FormSelect v-model="form.isActive" label="Active" :options="[{value:true,label:'Active'},{value:false,label:'Inactive'}]" />
      <FormInput v-model.number="form.sortOrder" label="Sort Order" type="number" />
    </Modal>

    <!-- Delete Modal -->
    <Modal v-model:show="showDeleteModal" title="Delete Template" confirm-text="Delete" @confirm="confirmDelete">
      <p>Delete template <strong>{{ selected?.name }}</strong>? This cannot be undone.</p>
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

export default {
  name: 'TemplatesSection',
  components: { DataTable, Modal, StatusBadge, FormInput, FormSelect },
  data(){
    return {
      loading:false,
      uploading:false,
      selectedFile:null,
      templates:[],
      filters:{ isActive: '' },
      columns:[
        { key:'name', label:'Name' },
        { key:'description', label:'Description' },
        { key:'pdfUrl', label:'PDF' },
        { key:'isActive', label:'Active' },
        { key:'sortOrder', label:'Order' },
        { key:'createdAt', label:'Created' },
        { key:'updatedAt', label:'Updated' }
      ],
      actions:[
        { key:'view', label:'View', icon:'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', variant:'primary', iconOnly:true },
        { key:'edit', label:'Edit', icon:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', variant:'success', iconOnly:true },
        { key:'delete', label:'Delete', icon:'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', variant:'danger', iconOnly:true }
      ],
      selected:null,
      showViewModal:false,
      showEditModal:false,
      showDeleteModal:false,
      editMode:false,
      form:{ name:'', description:'', pdfUrl:'', isActive:true, sortOrder:0 }
    }
  },
  async mounted(){ await this.loadData() },
  methods:{
    formatDate(v){ if(!v) return '-'; try{ return new Date(v).toLocaleString() } catch(e){ return String(v) } },
    async loadData(){
      this.loading=true
      try{
        const params={}
        if(this.filters.isActive !== '') params.isActive = this.filters.isActive
        const res = await modelsApi.getTemplates(params)
        this.templates = Array.isArray(res?.data) ? res.data : (res || [])
      } finally { this.loading=false }
    },
    onFileChange(e){ this.selectedFile = e.target.files?.[0] || null },
    async uploadPdf(){
      if(!this.selectedFile || !this.selected?.id && this.editMode===false){
        // if creating, upload after create; here we only upload when editing existing or after create flow sets selected
      }
      try{
        if(!this.selected?.id){ return }
        this.uploading = true
        const result = await modelsApi.uploadTemplatePdf(this.selected.id, this.selectedFile)
        // API returns updated template with pdfUrl
        const updated = result?.template || result
        if(updated?.pdfUrl){
          this.form.pdfUrl = updated.pdfUrl
        }
        alert('PDF uploaded')
      } catch(e){
        alert('Upload failed: ' + e.message)
      } finally {
        this.uploading = false
      }
    },
    openCreate(){
      this.editMode=false
      this.selected = null
      this.form={ name:'', description:'', pdfUrl:'', isActive:true, sortOrder:0 }
      this.showEditModal=true
    },
    async handleAction(action,row){
      this.selected=row
      if(action==='view'){
        try{ this.selected = await modelsApi.getTemplate(row.id); this.showViewModal=true } catch(e){ alert('Failed: '+e.message) }
      } else if(action==='edit'){
        this.editMode=true
        this.form={
          name: row.name,
          description: row.description || '',
          pdfUrl: row.pdfUrl || '',
          isActive: !!row.isActive,
          sortOrder: row.sortOrder ?? 0
        }
        this.showEditModal=true
      } else if(action==='delete'){
        this.showDeleteModal=true
      }
    },
    async saveTemplate(){
      try{
        if(this.editMode){
          const updated = await modelsApi.updateTemplate(this.selected.id, this.form)
          // Set selected to updated to allow immediate upload if desired
          this.selected = updated?.template || updated
        } else {
          const created = await modelsApi.createTemplate(this.form)
          this.selected = created?.template || created
        }
        this.showEditModal=false
        await this.loadData()
        alert('Saved')
      } catch(e){ alert('Failed: '+e.message) }
    },
    async confirmDelete(){
      try{ await modelsApi.deleteTemplate(this.selected.id); this.showDeleteModal=false; await this.loadData(); alert('Deleted') } catch(e){ alert('Failed: '+e.message) }
    }
  }
}
</script>

<style scoped>
.section-container{ display:flex; flex-direction:column; gap:1.5rem }
.section-header{ display:flex; align-items:center; justify-content:space-between }
.header-actions{ display:flex; gap:.5rem }
.section-header h2{ font-size:1.5rem; font-weight:600; color:#1F2937; margin:0; font-family:'Montserrat',sans-serif }
.btn{ display:inline-flex; align-items:center; gap:.5rem; padding:.625rem 1.25rem; border-radius:.5rem; font-weight:500; cursor:pointer; transition:all .2s; border:none; font-family:'Open Sans',sans-serif; font-size:.875rem }
.btn-primary{ background-color:#4F46E5; color:white }
.btn-success{ background-color:#10B981; color:white }
.btn-success:hover{ background-color:#059669 }
.filter-select{ padding:.625rem .875rem; border:1px solid #D1D5DB; border-radius:.5rem; font-size:.875rem; font-family:'Open Sans',sans-serif; min-width:150px }
.details-container{ display:flex; flex-direction:column; gap:.75rem }
.detail-row{ display:flex; align-items:center; gap:1rem; padding:.5rem 0; border-bottom:1px solid #E5E7EB }
.detail-label{ font-weight:600; color:#6B7280; min-width:140px; font-family:'Open Sans',sans-serif; font-size:.875rem }
.detail-value{ color:#1F2937; font-family:'Open Sans',sans-serif }
.upload-row{ display:flex; align-items:center; gap:.75rem; margin: .5rem 0 }
.link{ color:#1D4ED8; text-decoration: underline }
</style>

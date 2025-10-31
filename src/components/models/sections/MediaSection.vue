<template>
  <div class="section-container">
    <div class="section-header">
      <h2>Media</h2>
      <button @click="loadData" :disabled="loading" class="btn btn-primary">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Refresh
      </button>
    </div>

    <div class="filters-bar">
      <input v-model="filters.search" @input="debouncedSearch" type="text" placeholder="Search by filename, alt, tags..." class="filter-input" />
      <input v-model="filters.category" @input="debouncedSearch" type="text" placeholder="Category" class="filter-input" />
    </div>

    <DataTable :columns="columns" :data="media" :loading="loading" :actions="actions" @action="handleAction">
      <template #cell-isPublic="{ value }">
        <StatusBadge :status="value ? 'success' : 'secondary'" :label="value ? 'Public' : 'Private'" />
      </template>
    </DataTable>

    <Pagination v-if="pagination" :current-page="filters.page" :total-pages="pagination.totalPages" :total="pagination.total" @page-change="changePage" />

    <!-- Edit Modal -->
    <Modal v-model:show="showEditModal" title="Edit Media" @confirm="saveMedia">
      <FormInput v-model="editForm.alt" label="Alt" />
      <FormInput v-model="editForm.caption" label="Caption" />
      <FormInput v-model="editForm.category" label="Category" />
      <FormInput v-model="editForm.tags" label="Tags (comma separated)" />
      <FormSelect v-model="editForm.isPublic" label="Visibility" :options="[{value:true,label:'Public'},{value:false,label:'Private'}]" />
    </Modal>

    <!-- Delete -->
    <Modal v-model:show="showDeleteModal" title="Delete Media" confirm-text="Delete" @confirm="confirmDelete">
      <p>Delete media <strong>{{ selected?.filename }}</strong>?</p>
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
  name: 'MediaSection',
  components: { DataTable, Modal, StatusBadge, FormInput, FormSelect, Pagination },
  data(){
    return {
      loading:false,
      media:[],
      pagination:null,
      filters:{ page:1, limit:20, search:'', category:'' },
      columns:[
        { key:'filename', label:'Filename' },
        { key:'category', label:'Category' },
        { key:'isPublic', label:'Public' }
      ],
      actions:[
        { key:'edit', label:'Edit', icon:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', variant:'success', iconOnly:true },
        { key:'delete', label:'Delete', icon:'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', variant:'danger', iconOnly:true }
      ],
      selected:null,
      showEditModal:false,
      showDeleteModal:false,
      editForm:{ alt:'', caption:'', category:'', tags:'', isPublic:false },
      debounceTimer:null
    }
  },
  async mounted(){ await this.loadData() },
  methods:{
    async loadData(){
      this.loading=true
      try{
        const params={ ...this.filters }
        if(!params.search) delete params.search
        if(!params.category) delete params.category
        const res=await modelsApi.getMedia(params)
        this.media=res.data||[]
        this.pagination=res.pagination
      } finally{ this.loading=false }
    },
    debouncedSearch(){ clearTimeout(this.debounceTimer); this.debounceTimer=setTimeout(()=>{ this.filters.page=1; this.loadData() },500) },
    changePage(p){ this.filters.page=p; this.loadData() },
    handleAction(action,row){ this.selected=row; if(action==='edit'){ this.editForm={ alt:row.alt||'', caption:row.caption||'', category:row.category||'', tags:row.tags||'', isPublic:!!row.isPublic }; this.showEditModal=true } else if(action==='delete'){ this.showDeleteModal=true } },
    async saveMedia(){ try{ await modelsApi.updateMedia(this.selected.id,this.editForm); this.showEditModal=false; await this.loadData(); alert('Saved') } catch(e){ alert('Failed: '+e.message) } },
    async confirmDelete(){ try{ await modelsApi.deleteMedia(this.selected.id); this.showDeleteModal=false; await this.loadData(); alert('Deleted') } catch(e){ alert('Failed: '+e.message) } }
  }
}
</script>

<style scoped>
.section-container{ display:flex; flex-direction:column; gap:1.5rem }
.section-header{ display:flex; align-items:center; justify-content:space-between }
.section-header h2{ font-size:1.5rem; font-weight:600; color:#1F2937; margin:0; font-family:'Montserrat',sans-serif }
.btn{ display:inline-flex; align-items:center; gap:.5rem; padding:.625rem 1.25rem; border-radius:.5rem; font-weight:500; cursor:pointer; transition:all .2s; border:none; font-family:'Open Sans',sans-serif; font-size:.875rem }
.btn-primary{ background-color:#4F46E5; color:white }
.filters-bar{ display:flex; gap:1rem; flex-wrap:wrap }
.filter-input{ padding:.625rem .875rem; border:1px solid #D1D5DB; border-radius:.5rem; font-size:.875rem; font-family:'Open Sans',sans-serif; flex:1; min-width:200px }
.details-container{ display:flex; flex-direction:column; gap:1rem }
.detail-row{ display:flex; align-items:center; gap:1rem; padding:.75rem 0; border-bottom:1px solid #E5E7EB }
</style>

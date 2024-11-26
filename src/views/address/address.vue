<template>

    <LayoutMain>
        <template #slotUno>
          <Header
          :title="'Direcciones'"
          :titleButton="'Nueva direccion'"
          :open="showForm"
           v-show="hideContent"
          
          />
            
          <Forms
          :tittleForm="'Direcciones'"
          v-model:is-open="openForm"
          v-model:is-close="hideContent"
          :isEdit="isEdit"
          >
            <template #slotForm>

                <addressForm/>
                
              
            </template>
          </Forms>

            <el-table :data="tableData" style="width: 100%" v-show="hideContent">
                <el-table-column prop="city" label="Ciudad" />
                <el-table-column prop="neighborhood" label="Barrio" />
                <el-table-column prop="address" label="Direccion" />
                <el-table-column fixed="right" label="Operaciones">
      <template #default>
        <el-button link type="primary" :icon="Edit" size="default" @click="editTable"> </el-button>
        <el-button link type="danger" :icon="Delete" size="default"></el-button>
      </template>
    </el-table-column>
            </el-table>
        </template>

    </LayoutMain>

</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue'
import addressForm from './components/addressForm.vue';
import Header from '../../components/Header.vue';
import Forms from '../../components/Forms.vue';
import { ref } from 'vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'

const openForm = ref(false)
const hideContent= ref(true)
const isEdit = ref(null)

const showForm = async () =>{
  openForm.value = true
hideContent.value = false
isEdit.value = false
}

const editTable = async () =>{
  showForm()
  isEdit.value = true
}


const tableData = [
  {
    country : 'Colombia',
    department: 'Huila',
    city : 'Tesalia',
    neighborhood : 'Inspeccion de Pacarní',
    address: 'CL 5 #7-15 ',
  },
  
]
</script>

<style scoped>
.el-table{
    text-align: center;
}
</style>
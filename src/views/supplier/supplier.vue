<template>
    <LayoutMain>
        <template #slotUno>
            <Header
            :title="'Proveedores'"
            :titleButton="'Nuevo proveedor'"
            :open="showForm"
            v-show="hideContent"
            >

            </Header>

            <Forms
            :titleForm="'Proveedor'"
            v-model:is-open="openForm"
            v-model:is-close="hideContent"
            :isEdit="isEdit"
            >
                <template #slotForm>
                    <supplierForm/>
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
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue'
import Forms from '../../components/Forms.vue'
import supplierForm from './components/supplierForm.vue'
import { ref } from 'vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'

const openForm = ref(false)
const hideContent = ref(true)
const isEdit = ref(null)

const showForm = async () =>{
    openForm.value = true
    hideContent.value = false
    isEdit.value = false

}

const editTable = async ()=>{
    showForm()
    isEdit.value = true
}

</script>

<style scoped>

</style>
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
            @save="validation"
            >
                <template #slotForm>
                    <supplierForm ref="referenceF" :array="getCity"/>
                </template>
            </Forms>

            
            <el-table :data="getSupplier" style="width: 100%" v-show="hideContent">
                <el-table-column prop="supplier_name" label="Nombre" />
                <el-table-column prop="phone" label="Telefono" />
                <el-table-column prop="email" label="Email" />
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
import { onMounted, ref } from 'vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'

const openForm = ref(false)
const hideContent = ref(true)
const isEdit = ref(null)
const referenceF = ref()


const showForm = async () =>{
    openForm.value = true
    hideContent.value = false
    isEdit.value = false

}

const editTable = async ()=>{
    showForm()
    isEdit.value = true
}

const validation = async ()=>{
    const validate = await referenceF.value.runRules(referenceF.value.referenceForm)

    if(validate){
        createSupplier()
    }
}
const createSupplier = async ()=>{
    const url = 'http://127.0.0.1:8000/api/supplier/save'
    const data= {
        supplier_name: referenceF.value.dataForm.supplier_name,
        email: referenceF.value.dataForm.email,
        phone: referenceF.value.dataForm.phone,
        type_phone: referenceF.value.dataForm.type_phone,
        address:referenceF.value.dataForm.address,
        city_id: referenceF.value.dataForm.city_id,

    }

    try{
        axios.post(url, data)
        .then(function(response){
            ElMessage({
        message: `Se creo el proveedor`,
        type: 'success',
        plain: false,
    })
            referenceF.value.clearForm()
            getSupplierMethod()
            console.log(response)
        })

        .catch(function(error){
            ElMessage({
        message: `No se creo el proveedor ${error}`,
        type: 'warning',
        plain: false,
    })
            console.error(error)
        })
    }catch(error){
        console.error(error)
    }
}

const getSupplier = ref([])

const getSupplierMethod = async ()=>{
    const url = 'http://127.0.0.1:8000/api/supplier/get'

    try{
        axios.get(url)
        .then(function(response){
            getSupplier.value = response.data.result
        })
        .catch(function(error){
        console.error(error)
        })
    }catch(error){
        console.error(error)
    }
}


const getCity = ref([])

const getCityMethod = async ()=>{
    const url = 'http://127.0.0.1:8000/api/city/get'
    
    try{
        axios.get(url)
    .then(function(response){
        getCity.value = response.data.result
        console.log(response)
    })

    .catch(function(error){
        console.error(error)
    })
    }catch(error){
        console.error(error)
    }
}

onMounted(()=>{
    getCityMethod()
    getSupplierMethod()
})
</script>

<style scoped>

</style>
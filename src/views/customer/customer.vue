<template>
    <LayoutMain>
        <template #slotUno>
            
            <Header
            :title ="'Clientes'"
            :titleButton = "'Nuevo cliente'"
            :open="openForm"
            v-show="hideContent"
            />

            <Forms
            v-model:is-open="showForm"
            v-model:is-close="hideContent"
            :isEdit = "isEdit"
            :titleForm="'Clientes'"
            @save="validate"
            >
                <template #slotForm>
                    <customerForm ref="referenceF" :city="getCities" :rol="getRol"/>
                </template>
            </Forms>

            <el-table :data="getCustomer" style="width: 100%" v-show="hideContent">
                    <el-table-column prop="name" label="Nombre" width="140"/>
                    <el-table-column prop="documentType" label="Tipo de documento" width="140"/>
                    <el-table-column prop="identificationNumber" label="N° Identificación" width="140"/>
                    <el-table-column prop="rol_id" label="Tipo" width="140"/>
                    <el-table-column prop="email" label="Email" width="140"/>
                    <el-table-column prop="phone" label="Telefono" width="140"/>
                    <el-table-column prop="city_id" label="Ciudad" width="140"/>
                    <el-table-column prop="neighborhood_name" label="Barrio" width="140"/>
                    <el-table-column prop="address" label="Direccion" width="140"/>
                    <el-table-column fixed="right" label="Operaciones" width="140">
                        <template #default>
                            <el-button link type="primary" size="default" :icon="Edit" @click="editDataTable()"></el-button>
                            <el-button link type="danger" size="default" :icon="Delete" @click=""></el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </template>
    </LayoutMain>
</template>
<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import Forms from '../../components/Forms.vue';
import customerForm from './components/customerForm.vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus'
import {
Edit,
Delete
} from '@element-plus/icons-vue'

const showForm = ref(false)
const hideContent = ref(true)
const isEdit = ref(null)
const referenceF = ref(null)

const openForm = async () =>{
    showForm.value = true
hideContent.value =  false
isEdit.value = false

}

const editTable = async () =>{
    openForm()
isEdit.value = true

}

const validate = async ()=>{
    const validation = await referenceF.value.validateForm(referenceF.value.formRef)

    if(validation){
        createCustomer()
    }
}

const createCustomer = async ()=>{

    const url= 'http://127.0.0.1:8000/api/customer/save'

    const data= {
        name: referenceF.value.dataForm.name,
        documentType: referenceF.value.dataForm.type_docment,
        identificationNumber: referenceF.value.dataForm.identificationNumber,
        email: referenceF.value.dataForm.email,
        phone: referenceF.value.dataForm.phone,
        type_phone: referenceF.value.dataForm.type_phone,
        neighborhood_name: referenceF.value.dataForm.neighborhood_name,
        address: referenceF.value.dataForm.address,
        city_id: referenceF.value.dataForm.city_id,
        rol_id: referenceF.value.dataForm.rol_id
    }

    try{
        axios.post(url, data)
        .then(function(response){
            referenceF.value.clearFormInputs()
            getCustomerMethod()
            ElMessage({
        message: `Se  creo el cliente`,
        type: 'success',
        plain: false,
    })
            console.log(response)
        })

        .catch(function(error){
            ElMessage({
        message: `No se creo el cliente ${error}`,
        type: 'warning',
        plain: false,
    })
            console.error(error)
        })
    }catch(error){
        console.error(error)
    }
}

const getCustomer = ref([])

const getCustomerMethod = async ()=>{
    const url = 'http://127.0.0.1:8000/api/customer/get'

try{
    axios.get(url)
    .then(function(response){
        getCustomer.value = response.data.result
        console.log(response)
    })

    .catch(function(error){
        console.error(error)
    })
}catch(error){
    console.error(error)
}
}

const getCities = ref([])

const getCity = async ()=>{
    const url = 'http://127.0.0.1:8000/api/city/get'

    try{
        axios.get(url)
        .then(function(response){
            getCities.value = response.data.result
            console.log(response)
        })

        .catch(function(error){
            console.error(error)
        })
    }catch(error){
        console.error(error)
    }
}


const getRol = ref([])

const getRolMethod = async ()=>{
    const url = 'http://127.0.0.1:8000/api/rol/get'

try{
    axios.get(url)
    .then(function(response){
        getRol.value = response.data.result
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
    getCity()
    getRolMethod()
    getCustomerMethod()
})
</script>

<style scoped>

</style>
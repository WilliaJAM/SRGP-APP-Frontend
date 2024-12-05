<template>
    <LayoutMain>

        <template #slotUno>
            <Header
            :title="'Usuarios'"
            :titleButton="'Nuevo usuario'"
            :open="openForm"
            v-show="hideContent"
            />

            <Forms
            v-model:is-open="showForm"
            v-model:is-close="hideContent"
            :isEdit="isEdit"
            :titleForm="'usuarios'"
            @save="validations"
            >
                <template #slotForm>
                    <userForm ref="referenceF" :city="getCity" :rol="getRolArray"/>
                </template>
            </Forms>

            <el-table :data="getUser" style="width: 100%" v-show="hideContent">
                <el-table-column prop="image" label="Foto" />
                <el-table-column prop="name" label="Nombres"  />
                <el-table-column prop="last_name" label="Apellidos" />
                <el-table-column prop="cedula" label="Numero de identificación" />
                <el-table-column prop="gender" label="Genero" />
                <el-table-column prop="registration_date" label="Fecha de registro" />
                <el-table-column prop="phone" label="Telefono" />
                <el-table-column prop="rol_id" label="Rol" />
                <el-table-column prop="email" label="Email" />
                <el-table-column fixed="right" label="Operaciones" >
                        <template #default>
                            <el-button link type="primary" size="default" :icon="Edit" @click="editTable()"></el-button>
                            <el-button link type="danger" size="default" :icon="Delete" @click=""></el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/layoutMain.vue';
import Header from '../../components/Header.vue';
import Forms from '../../components/Forms.vue';
import userForm from './components/userForm.vue'
import { onMounted, ref } from 'vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import axios from 'axios';

const showForm = ref(false)
const hideContent = ref(true)
const isEdit = ref(null)
const referenceF = ref(null)

const openForm = async ()=>{
    showForm.value = true
    hideContent.value = false
    isEdit.value = false
}

const editTable = async ()=>{
    openForm()
    isEdit.value = false
}


const validations = async ()=>{
    const validateForm = await referenceF.value.runRules(referenceF.value.referenceForm)

    if(validateForm){
        createUser()
    }
}

const createUser = async ()=>{

    const url= 'http://127.0.0.1:8000/api/user/save'
    const data = {
        name: referenceF.value.dataForm.name,
        last_name: referenceF.value.dataForm.last_name,
        image: referenceF.value.dataForm.image,
        cedula: referenceF.value.dataForm.cedula,
        birthdate: referenceF.value.dataForm.birthdate,
        password: referenceF.value.dataForm.password,
        gender: referenceF.value.dataForm.gender,
        registration_date: referenceF.value.dataForm.registration_date,
        account_status: referenceF.value.dataForm.account_status,
        email: referenceF.value.dataForm.email,
        user_id: referenceF.value.dataForm.user_id,
        rol_id: referenceF.value.dataForm.rol_id,
        type_phone: referenceF.value.dataForm.typePhone,
        phone: referenceF.value.dataForm.numberPhone,
        neighborhood_name: referenceF.value.dataForm.neighborhoodName,
        address: referenceF.value.dataForm.address,
        city_id: referenceF.value.dataForm.city_id,
    }

    try{
        axios.post(url, data)
    .then(function(response){
        referenceF.value.resetFields()
        console.log(response)
    })
    .catch(function(error){
        console.error(error)
    })
    }catch(error){
        console.error(error)
    }
}



const getUser = ref([])

const getUserFunction = async ()=>{
    const url = 'http://127.0.0.1:8000/api/user/get'

    try{
        axios.get(url)
        .then(function(response){
            getUser.value = response.data.result
        })

        .catch(function(error){
            console.error(error)
        })
    }catch(error){
        console.error(error)
    }
}


const getCity = ref([])

const getCities = async ()=>{
    const url= 'http://127.0.0.1:8000/api/city/get'

    try{
        axios.get(url)
    .then(function(response){
        getCity.value= response.data.result
        console.log(response)
    })
    .catch(function(error){
        console.error(error)
    })
    }catch(error){
        console.error(error)
    }
}

const getRolArray = ref([])
const getRol = async ()=>{
    const url= 'http://127.0.0.1:8000/api/rol/get'
    
    try{
        axios.get(url)
    .then(function(response){
        getRolArray.value= response.data.result
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
    getCities()
    getRol()
    getUserFunction()
})
</script>

<style scoped>

</style>
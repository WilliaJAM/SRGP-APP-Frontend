<template>
    <LayoutMain>
        <template #slotUno>
            
            <Header
            :title="'Departementos'"
            :titleButton="'Nuevo departemento'"
            :open="openForm"
            v-show="hideForm"
            />

            <Forms
            :titleForm = "'Departementos'"
            v-model:is-open = "showForm"
            v-model:is-close="hideForm"
            :isEdit = "isEdit"
            >

            <template #slotForm>
                <dptForm />
            </template>

            </Forms>
                <el-table :data="tableData" style="width: 100%" v-show="hideForm">
                    <el-table-column prop="name" label="Nombre" />
                    <el-table-column prop="code" label="Codigo"/>
                    <el-table-column prop="country_id" label="Pais"/>
                    <el-table-column fixed="right" label="Operations">
                        <template #default>
                            <el-button link type="primary" :icon="Edit" size="default" @click="editing"></el-button>
                            <el-button link type="danger" :icon="Delete" size="default" @click="asdasd"></el-button>
                        </template>
                    </el-table-column>
                </el-table>

        </template>
    </LayoutMain>
</template>

<script setup>
import Forms from '../../components/Forms.vue';
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import dptForm from './components/dptForm.vue';
import { ref } from 'vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import axios from 'axios';


const showForm = ref(false)
const hideForm = ref(true)

const isEdit= ref(null)

const openForm = async () =>{
    showForm.value = true
    hideForm.value = false
    isEdit.value = false
}

const editing = async () =>{
    openForm()
    isEdit.value= true
}

const asdasd = ()=> {
    alert('Borrado')
}



const createDpt = async () =>{

    const url = 'http://127.0.0.1:8000/api/department/save'

    try{
        axios.post(url, data)
    .then(function (response){

    })

    .catch(function (response){
        console.error(error)

    }) 
    }catch(error){
        console.error(error)
    }

}
const updateDpt = async () =>{
    
}

const deleteDpt = async () =>{
    
}

const getDepartment = ref([

])


const getDpt = async () =>{

    const url = 'http://127.0.0.1:8000/api/department/get'

try{
    axios.get(url)
.then(function (response){
    getDepartment.value = response.data.result
})

.catch(function (error){
    console.error(error)

}) 
}catch(error){
    console.error(error)
}
}



</script>
<style scoped>

</style>
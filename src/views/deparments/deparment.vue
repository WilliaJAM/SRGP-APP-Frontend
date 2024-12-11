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
            @save="validations"
            @update="validationsForUpdate"
            >

            <template #slotForm>
                <dptForm 
                ref="referenceF"
                :getCountry="getCountryObject"
                :dataValue="getData"
                />
            </template>

            </Forms>
                <el-table :data="getDepartment" style="width: 100%" v-show="hideForm">
                    <el-table-column prop="name" label="Nombre" />
                    <el-table-column prop="code" label="Codigo"/>
                    <el-table-column :formatter="formatCountryName" label="Pais"/>
                    <el-table-column fixed="right" label="Operations">
                        <template #default="tableData">
                            <el-button link type="primary" :icon="Edit" size="default" @click="editing(tableData.row.id)"></el-button>
                            <el-button link type="danger" :icon="Delete" size="default" @click="deleteDepartment(tableData.row.id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>

        </template>
    </LayoutMain>
</template>

<script setup>
import Forms from '../../components/Forms.vue';
import LayoutMain from '../../components/layoutMain.vue';
import Header from '../../components/Header.vue';
import dptForm from './components/dptForm.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref ,} from 'vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import axios from 'axios';


const showForm = ref(false)
const hideForm = ref(true)

const isEdit= ref(null)
const referenceF = ref(null)

const getData = ref ()

const openForm = async () =>{
    showForm.value = true
    hideForm.value = false
    isEdit.value = false
}

const editing = async (id) =>{
    openForm()
    getData.value = await getDptById(id)
    isEdit.value= true
}

const formatCountryName = (row) => {
    const country = getCountryObject.value.find(c => c.id === row.country_id);
    return country ? country.name : 'No asignado'; 
}



//validaciones
const validations = async () =>{
    const validate =  await referenceF.value.runRules(referenceF.value.referenceForm)
    if(validate){
        createDpt()
    }
}

//crea data de dpts
const createDpt = async () =>{

    const url = 'http://127.0.0.1:8000/api/department/save'

    const data = {
        name: referenceF.value.dataForm.name,
        code: referenceF.value.dataForm.code,
        country_id: referenceF.value.dataForm.country_id
    }

    try{
        axios.post(url, data)
    .then(function (response){
        referenceF.value.clearForm()
        getDpt()
        ElMessage({
            message: `Se creó el departamento`,
            type: 'success',
            plain: false,
    })
    })

    .catch(function (response){
        console.error(error)
    ElMessage({
        message: `No se creo el departamento ${error}`,
        type: 'warning',
        plain: false,
    })
    }) 
    }catch(error){
        console.error(error)
    }

}

//trae data de los dpts
const getDepartment = ref([])

const getDpt = async () =>{

    const url = 'http://127.0.0.1:8000/api/department/get'

try{
    axios.get(url)
.then(function (response){
    ElMessage({
            type: 'info',
            message: "Se cargaron los datos"
        })
    getDepartment.value = response.data.result
})

.catch(function (error){
    console.error(error)

}) 
}catch(error){
    console.error(error)
}
}



//traer data de los paises
const getCountryObject = ref([]);

const getCountry = async () =>{

const url = 'http://127.0.0.1:8000/api/country/get'

try {
    axios.get(url)
.then(function (response) {
    getCountryObject.value = response.data.result //accedar a los resultados del get
    console.log(response)
})
.catch(function (error) {
    console.error(error)
});
}catch(error){
    console.error(error)
}
} 


const deleteDepartment = async(id)=>{

    const url = 'http://127.0.0.1:8000/api/department/delete'
    ElMessageBox.confirm(
    'Seguro que desea eliminar?',
    'Warning',
    {
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        type: 'warning',
    }
  )
    .then(() => {
        try{
            axios.delete(url, {data: {id}})
        .then(function (response){
            getDpt() 
            console.log(response);
        })
        .catch(function (error){
            console.error(error)
        })
        }catch(error){
            console.error(error)
        }
      ElMessage({
        type: 'success',
        message: 'Se elimino satisfactoriamente',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Operación cancelada',
      })
    })
}

const validationsForUpdate = async() =>{
    const validationsRules = referenceF.value.runRules(referenceF.value.referenceForm)
    if(validationsRules){
    departmentUpdate()
}
}

const getDptById = async (id)=>{

    const url = 'http://127.0.0.1:8000/api/department/getDataById'

    try{
        const response = axios.get(url, {
        params: {
            id: id
        }
        })
            return (await response).data.result
    
    }catch(error){
        console.error(error)
    }
}


const departmentUpdate = async ()=>{
    const url = 'http://127.0.0.1:8000/api/department/update'

    const updateInfo = {
        id: getData.value[0].id,
        name: referenceF.value.dataForm.name,
        code: referenceF.value.dataForm.code,
        country_id: referenceF.value.dataForm.country_id
    }

    try{
        axios.put(url, updateInfo)

        .then(function(response){
        getDpt()
        showForm.value = false
        hideForm.value = true
        referenceF.value.clearForm()
        ElMessage({
        message: `Se actualizó el departamento satisfactoriamente`,
        type: 'success',
        plain: false,
        })
        console.log(response);

        })

        .catch(function(error){
            console.error(error);
        })
    }catch(error){
        console.error(error);
    }
}

onMounted(() =>{
    getCountry()
    getDpt()
})
</script>
<style scoped>

</style>
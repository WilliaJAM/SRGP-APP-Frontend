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
            >

            <template #slotForm>
                <dptForm 
                ref="referenceF"
                :getCountry="getCountryObject"
                />
            </template>

            </Forms>
                <el-table :data="getDepartment" style="width: 100%" v-show="hideForm">
                    <el-table-column prop="name" label="Nombre" />
                    <el-table-column prop="code" label="Codigo"/>
                    <el-table-column :formatter="formatCountryName" label="Pais"/>
                    <el-table-column fixed="right" label="Operations">
                        <template #default="tableData">
                            <el-button link type="primary" :icon="Edit" size="default" @click="editing"></el-button>
                            <el-button link type="danger" :icon="Delete" size="default" @click="deleteDepartment(tableData.row.id)"></el-button>
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
const updateDpt = async () =>{
    
}

const deleteDpt = async () =>{
    
}

//trae data de los dpts
const getDepartment = ref([])

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
onMounted(() =>{
    getCountry()
    getDpt()
})
</script>
<style scoped>

</style>
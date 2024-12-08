<template>
    <LayoutMain>
        <template #slotUno>
            <Header
            :title="'Ciudades'"
            :titleButton="'Nueva ciudad'"
            :open="isVisble"
            v-show="hideForm"
            >

            </Header>

            <Forms
            :titleForm="'Ciudades'"
            v-model:is-open ="openForm"
            v-model:is-close = "hideForm"
            :isEdit="isEdit"
            @save="validations"
            >
                <template #slotForm>
                    <cityForm ref="referenceF" :array="getDepartment"/>
                </template>
            </Forms>
            <el-table :data="getCity" style="width: 100%" v-show="hideForm">
    <el-table-column prop="name" label="Nombre" />
    <el-table-column prop="code" label="Codigo" />
    <el-table-column :formatter="formatDptName" label="Departementos" />
    <el-table-column fixed="right" label="Operaciones">
      <template #default="tableData">
        <el-button link type="primary" :icon="Edit" size="default" @click="editTable"> </el-button>
        <el-button link type="danger" :icon="Delete" size="default" @click="deleteCity(tableData.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>

        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import cityForm from './components/cityForm.vue'
import Forms from '../../components/Forms.vue';
import Header from '../../components/Header.vue';
import { onMounted, ref } from 'vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage, formatter,ElMessageBox } from 'element-plus';


const openForm = ref(false);
const hideForm = ref(true);
const isEdit = ref(null);
const referenceF = ref(null)

const isVisble = async () =>{
    openForm.value = true
    hideForm.value = false
    isEdit.value = false
}

const editTable =async () =>{
    isVisble()
    isEdit.value= true
}


const validations = async ()=>{
  const validate =  await referenceF.value.runRules(referenceF.value.referenceForm)

  if(validate){
    createCity()
  }
}

const formatDptName = (row) => {
    const country = getDepartment.value.find(dpts => dpts.id === row.department_id);
    return country ? country.name : 'No asignado'; 
}

const createCity = async ()=>{
  const url = 'http://127.0.0.1:8000/api/city/save'

  const data = {
    name: referenceF.value.dataForm.name,
    code: referenceF.value.dataForm.code ,
    department_id: referenceF.value.dataForm.department_id,
  }

  try{
    axios.post(url, data)
  .then(function (response){
    referenceF.value.clearForm()
    getCities()
    ElMessage({
      message: `Se creó la ciudad`,
            type: 'success',
            plain: false,
    })
    console.log(response)
  })

  .catch(function (error){
    console.error(error)
    ElMessage({
      message: `No se creó la ciudad`,
            type: 'warning',
            plain: false,
    })
  })
  }catch(error){
    console.error(error)
  }
}

const getCity = ref([])

const getCities = async ()=>{
  const url = 'http://127.0.0.1:8000/api/city/get'

  try{
    axios.get(url)
    .then(function (response){
      getCity.value= response.data.result
      console.log(response);
    })

    .catch(function (error){
      console.error(error)
    })
  }catch(error){
    console.error(error)
  }
}

const getDepartment = ref([])

const getDpts = async ()=>{
  const url = 'http://127.0.0.1:8000/api/department/get'

  try{
    axios.get(url)
    .then(function (response){
      getDepartment.value= response.data.result
      console.log(response);
    })

    .catch(function (error){
      console.error(error)
    })
  }catch(error){
    console.error(error)
  }
}

const deleteCity = async (id)=>{
  const url = 'http://127.0.0.1:8000/api/city/delete'

  ElMessageBox.confirm(
    'Seguro que desea eliminar, esta acción no se puede deshacer',
    'Warning',
    {
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      type: 'error',
    }
  )
    .then(() => {
      try{
        axios.delete(url, {data: {id}})
      .then(function(response){
        getCities()
        console.log(response);
      })

      .catch(function(error){
        console.error(error)
      })
      }catch(error){
        console.error(error)
      }
      ElMessage({
        type: 'success',
        message: 'Eliminado satisfactoriamente',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Operación cancelada',
      })
    })
}

onMounted(()=>{
  getDpts()
  getCities()
})
</script>

<style scoped>

</style>
<template>
    <LayoutMain>
    <template #slotUno>
        <Header
        :title="'Roles'"
        :titleButton = "'Crear Rol'"
        :open="openForm"
        v-show="hideForm"
        />

        <Forms
        :titleForm="'Roles'"
        v-model:is-open="showForm"
        v-model:is-close="hideForm"
        :is-edit="isEdit"
        @save="validateForm"
        @update="validationsForUpdate"
        >
            <template #slotForm>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- solo es el formulario de country -->
                <rolForm v-model:is-open="showForm" ref="referenceForm" :array="getDataOfTheMethod" :dataValue="getDataObject"  />
                    </el-col>
                </el-row>
            </template>
        </Forms>

        <el-table :data="getDataRol" style="width: 100%" v-show="hideForm">
                <el-table-column prop="id" label="Id" width="100"/>
                <el-table-column prop="name" label="Nombre" />
    <el-table-column fixed="right" label="Operaciones">
        <template #default="dataTable">
        <el-button link type="primary" size="default" :icon="Edit" @click="editDataTable(dataTable.row.id)">
        </el-button>
        <el-button link type="danger" :icon="Delete" size="default" @click="deleteRol(dataTable.row.id)"></el-button>
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
import rolForm from './components/rolForm.vue'
import {Edit, Delete} from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const showForm = ref(false);
const hideForm = ref(true);
const referenceForm = ref(null)

const isEdit = ref(null);

const getDataObject = ref()

const openForm = () => {
    showForm.value = true;
    hideForm.value = false;
    isEdit.value = false;

//cambia el valor de la variable resetButton
    if(resetButton.value == false){
      resetButton.value = true
    }
    

}

const resetButton = ref(true);


const editDataTable=  async(id) => {
    openForm();
    getDataObject.value = await getDataById(id)
    isEdit.value = true;


};
//validacion y funciones del CRUD
const validateForm = async() =>{
  // const reference = await formRef.value.formRef
  const validate = await referenceForm.value.validateForm(referenceForm.value.formRef);
  //si es un metodo osea un funcion se pone asi logicamente, 
  //si es una variable seria algo asi validate.value.nombreVariable
  //en teoria el error es porque el parametro especificado en rolForm 
  //no esta ciendo especificado por eso no ejeucta las reglas y por eso manda false, y era algo asi 
  //expuse la referencia del rolForm la llame aqui y la puse en otra varaible y esa varible la puse en el metodo 
  //expuesto(tambien sirve si ponemos directamente la expocicion en la funcion solo que no especificamos variables y no
  //llenasmos el script con puras varibales).
  if(validate){
    await createRol();
  }

}

const createRol = async() =>{

  const url = 'http://127.0.0.1:8000/api/rol/save'

  const data = {
    name: referenceForm.value.dataForm.name
  } 
  try{
    axios.post(url, data)
  .then(function (response) {
    console.log(response);
    getData()
    referenceForm.value.clearFormInputs()
    ElMessage({
    message: 'El rol se creo correctamente',
    type: 'success',
    plain: true,
  })
  })
  .catch(function (error) {
    ElMessage({
    message: `No se creo el rol ${error}`,
    type: 'warning',
    plain: true,
  })
  });
  }catch(error){
    console.error('Error', error)
  }
}

const deleteRol = async(id) =>{
  const url = 'http://127.0.0.1:8000/api/rol/delete'


  ElMessageBox.confirm(
'Seguro que desea eliminar, esta acción no se puede deshacer?',
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

    .then(function(response){
      getData()
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

const getDataRol= ref([])

const getData = async() =>{
  
  const url = 'http://127.0.0.1:8000/api/rol/get'

  try{
    axios.get(url)
  .then(function (response) {
    ElMessage({
            type: 'info',
            message: "Se cargaron los datos"
        })
    getDataRol.value = response.data.result
  })
  .catch(function (error) {
    console.error(error);
  })
  }catch(error){
    console.error(error)
  }

}

const getDataById = async (id)=>{

  const url = 'http://127.0.0.1:8000/api/rol/getDataById'

  try{

    const response = axios.get(url, {params: {id: id}})

    return (await response).data.result

  }catch(error){
    console.error(error)
  }
}

const validationsForUpdate = async ()=>{
  const validate = await referenceForm.value.validateForm(referenceForm.value.formRef)

  if(validate){
    updateRol()
  }
}

const updateRol = async ()=>{
  const url = 'http://127.0.0.1:8000/api/rol/update'

  const updateInfo = {
    id: getDataObject.value[0].id,
    name: referenceForm.value.dataForm.name
  }

  axios.put(url, updateInfo)

  .then(function(response){
    referenceForm.value.clearFormInputs()
    showForm.value =false
    hideForm.value =true
    getData()
    ElMessage({
      type: 'success',
      message: 'Se actualizó satisfactoriamente'
    })
    console.log(response);
  })

  .catch(function(error){
    ElMessage({
      type: 'warning',
      message: 'No se actualizaron los datos'
    })
    console.error(error)
  })
}

onMounted(()=>{ //ejecuta la funcion apenas se cargue el componente
  getData()
})

</script>

<style scoped>

.el-col{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
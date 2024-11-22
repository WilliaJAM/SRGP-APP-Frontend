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
        >
            <template #slotForm>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- solo es el formulario de country -->
                <rolForm
                v-model:is-open="showForm"
                ref="referenceForm" 
                />
                    </el-col>
                </el-row>
            </template>
        </Forms>

        <el-table :data="tableData" style="width: 100%" v-show="hideForm">
                <el-table-column prop="id" label="Id" width="100"/>
                <el-table-column prop="name" label="Nombre" width="700" />
    <el-table-column fixed="right" label="Operaciones" min-width="120">
        <template #default>
        <el-button link type="primary" size="default" :icon="Edit" @click="editDataTable">
        </el-button>
        <el-button link type="danger" :icon="Delete" size="default"></el-button>
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
import { ElMessage } from 'element-plus'

const showForm = ref(false);
const hideForm = ref(true);
const referenceForm = ref(null)

const isEdit = ref(null);

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


const editDataTable=  async() => {
    openForm();
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

const updateRol = async() =>{
  console.log('se Actualizó el rol');

}

const deleteRol = async() =>{
  console.log('se elimino el rol');

}

const getMethod= ref([

])

const getData = async() =>{
  const url = 'http://127.0.0.1:8000/api/rol/get'

  try{
    axios.get(url)
  .then(function (response) {
    getMethod.value = response.data
    console.log(getMethod);

  })
  .catch(function (error) {
    console.error(error);
  })
  }catch(error){
    console.error(error)
  }

}
onMounted(()=>{ //ejecuta la funcion apenas se cargue el componente
  getData()
})

// const tableData = [
//   {
//     id: '1',
//     name: 'Usuario Normal',
//   },
//   {
//     id: '2',
//     name: 'Administrador',
//   },
//   {
//     id: '3',
//     name: 'Tecnico',
//   },
//   {
//     id: '4',
//     name: 'Jefe',
//   },
// ]


</script>

<style scoped>

.el-col{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
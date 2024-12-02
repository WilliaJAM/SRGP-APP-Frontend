<template>
    <LayoutMain>
        <template #slotUno>
          <Header
            :title="'Inventario'"
            :titleButton="'Nuevo Elemento'"
            :open="openForm"
            v-show="hideForm"
            />
          <Forms
          :titleForm="'Paises'"
          v-model:is-open="showForm"
          v-model:is-close="hideForm"
          :is-edit="isEdit"
          >
            <template #slotForm>
              <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- solo es el formulario de country -->
                <inventoryForm
                v-model:is-open="showForm"
                :dataValue="getData"
                />
              </el-col>
            </el-row>
            </template>
          </Forms>

            <el-table :data="tableData" style="width: 100%"   v-show="hideForm">
              <el-table-column prop="cuantity" label="Cantidad"/>
              <el-table-column prop="name" label="Nombre del producto"/>
              <el-table-column prop="dateEntry" label="Fecha de entrada"/>
              <el-table-column prop="departureDate" label="Fecha de salida"/>
              <el-table-column prop="supplierName" label="Proveedor"/>
              <el-table-column fixed="right" label="Operaciones">
      <template #default="dataInfo">
        <el-button link type="primary" :icon="Edit" size="default" @click="editDataTable(tableData.row.id)"></el-button>
        <el-button link type="danger" :icon="Delete" size="default" @click="deleteInventory" ></el-button>
      </template>
    </el-table-column>

  </el-table>
        </template>

    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import inventoryForm from './components/inventoryForm.vue';
import Forms from '../../components/Forms.vue';
import {
Edit,
Delete

} from '@element-plus/icons-vue'
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const showForm = ref(false);
const hideForm = ref(true);
const formRef = ref()

const getData = ref([])

const isEdit = ref(null);

const openForm = () => {
    showForm.value = true;
    hideForm.value = false;
    isEdit.value = false;

}


const editDataTable=  async(id) => {
    openForm();
    getInventoryById(id);
    isEdit.value = true;


};

const createInventory = async () =>{

}
//actualiza y edita la informacion
const updateInventory = async () =>{
  
}

const getInventoryById = async (id) =>{
  const url = 'asd'

  try{
    axios.get(url, {data: {id}}) //obtiene los datos por id
  .then(function(response){
    console.log(response);
  })


  .catch(function(error){
    console.error(error)
  })
  }catch(error){
  console.error('se encontro un error',error)
  }
}
//elimina los datos de la tabla por medio del id
const deleteInventory = async () =>{
  
  const url = 'asd'

  ElMessageBox.confirm(
    'Seguro que quiere borralo permanentemente?',
    'Eliminar dato',
    {
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      type: 'error',
    }
  )
    .then(() => {
      try{
        axios.delete(url, {data: {id}})
        .then( function(response){
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
        message: 'Se eliminó correctamente',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminación cancelada',
      })
    })
}

const windowConfirm = async () =>{
  
}

const getInventory = async () =>{
  
}
const tableData = [
  {
    stock: 'Disponible',
    date: '2016-05-03',
    name: 'Perfil 3/4',
    address: '100',
  },
  {
    stock: 'Disponible',
    date: '2016-05-03',
    name: 'Angulo de pulgada',
    address: '10',
  },
  {
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  
]
</script>

<style scoped>

</style>
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
          @save="createInventory"
          >
            <template #slotForm>
              <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- solo es el formulario de country -->
                <inventoryForm
                v-model:is-open="showForm"
                :dataValue="getData"
                :array="getSupplier"
                ref="referenceF"
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
      <template #default>
        <el-button link type="primary" :icon="Edit" size="default" @click="editDataTable()"></el-button>
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
import { onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const showForm = ref(false);
const hideForm = ref(true);
const referenceF = ref(null)

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

const validate = async ()=>{
  const validations = await referenceF.value.runRules(referenceF.value.referenceForm)

  if(validations){
    createInventory()
  }
}

const createInventory = async () =>{
  const url = 'http://127.0.0.1:8000/api/invetory/save'

  const data = {
    name:referenceF.value.dataForm.name,
    quantity_in_stock:referenceF.value.dataForm.cuantityInStock,
    departure_date:referenceF.value.dataForm.departureDate,
    date_of_entry:referenceF.value.dataForm.dateOfEntry,
    supplier_id:referenceF.value.dataForm.supplier_id,
  }
  
  axios.post(url, data)
  .then(function(response){
    referenceF.value.clearForm()
    ElMessage({
        message: `Se creo el item del inventario`,
        type: 'success',
        plain: false,
    })
    console.log(response);
  })

  .catch(function(error){
    ElMessage({
        message: `No se creo el item del inventario ${error}`,
        type: 'warning',
        plain: false,
    })
    console.error(error)
  })

}

const getIventory = ref([])

const getIventoryMethod = async()=>{
// const url = ''

}

//actualiza y edita la informacion
const updateInventory = async () =>{
  
}

const getInventoryById = async (id) =>{
  // const url = ''

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



const getSupplier= ref([])

const getSupplierMethod = async ()=>{
  const url= 'http://127.0.0.1:8000/api/supplier/get'
  axios.get(url)
  .then(function(response){
    getSupplier.value = response.data.result
    console.log(response);
  })
.catch(function(error){
    console.error(error)
  })
}

onMounted(()=>{
  getSupplierMethod()
})
</script>

<style scoped>

</style>
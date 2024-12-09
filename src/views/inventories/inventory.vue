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
          :titleForm="'inventario'"
          v-model:is-open="showForm"
          v-model:is-close="hideForm"
          :is-edit="isEdit"
          @save="validate"
          @update="validationsForUpdate"
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

            <el-table :data="getIventory" style="width: 100%"   v-show="hideForm">
              <el-table-column prop="name" label="Nombre del producto"/>
              <el-table-column prop="quantity_in_stock" label="Cantidad"/>
              <el-table-column prop="departure_date" label="Fecha de salida"/>
              <el-table-column prop="date_of_entry" label="Fecha de entrada"/>
              <el-table-column :formatter="formatSupplierName" label="Proveedor"/>
              <el-table-column fixed="right" label="Operaciones">
      <template #default="dataTable">
        <el-button link type="primary" :icon="Edit" size="default" @click="editDataTable(dataTable.row.id)"></el-button>
        <el-button link type="danger" :icon="Delete" size="default" @click="deleteInventory(dataTable.row.id)" ></el-button>
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

const getData = ref()

const isEdit = ref(null);

const openForm = () => {
    showForm.value = true;
    hideForm.value = false;
    isEdit.value = false;

}


const editDataTable=  async(id) => {
    openForm();
    getData.value = await getInventoryById(id);
    isEdit.value = true;


};

const formatSupplierName = (row) => {
  const supplier = getSupplier.value.find(supplier => supplier.id === row.supplier_id);
  return supplier ? supplier.supplier_name : 'No asignado';
}





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
    getIventoryMethod()
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
const url = 'http://127.0.0.1:8000/api/invetory/get'

try{
  axios.get(url)
  .then(function(response){
    ElMessage({
            type: 'info',
            message: "Se cargaron los datos"
        })
    getIventory.value= response.data.result
  console.log(response);
  })

  .catch(function(error){
  console.error(error)
})
}catch(error){
  console.error(error)

}

}


//elimina los datos de la tabla por medio del id
const deleteInventory = async (id) =>{
  
  const url = 'http://127.0.0.1:8000/api/invetory/delete'

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
          getIventoryMethod()
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

const getSupplier= ref([])

const getSupplierMethod = async ()=>{
  const url= 'http://127.0.0.1:8000/api/supplier/get'
  try{
    axios.get(url)
  .then(function(response){
    getSupplier.value = response.data.result
    console.log(getSupplier.value);
  })
.catch(function(error){
    console.error(error)
  })
  }catch(error){
    console.error(error)
  }
}

const getInventoryById = async (id) =>{
  const url = 'http://127.0.0.1:8000/api/invetory/getDataById'

  try{
    const response= axios.get(url, {params: {id: id}}) //obtiene los datos por id
    
    return (await response).data.result

  }catch(error){
  console.error('se encontro un error',error)
  }
}

const validationsForUpdate = async ()=>{

  const validations = referenceF.value.runRules()
  
  if(validations){
    updateInventory()
  }
}

const updateInventory = async ()=>{
  const url = 'http://127.0.0.1:8000/api/invetory/update'

  const updateInfo = {
    id: getData.value[0].id,
    name: referenceF.value.dataForm.name,
    quantity_in_stock: referenceF.value.dataForm.cuantityInStock,
    departure_date: referenceF.value.dataForm.departureDate,
    date_of_entry: referenceF.value.dataForm.dateOfEntry,
    supplier_id: referenceF.value.dataForm.supplier_id,
}

  try{
    axios.put(url, updateInfo)

    .then(function(response){
      showForm.value = false;
      hideForm.value =true;
      getIventoryMethod()
      referenceF.value.clearForm()
      ElMessage({
        type: 'success',
        message: 'Se actualizó satisfactoriamente'
      })
      console.log(response);
    })

    .catch(function(error){
      ElMessage({
        type: 'warning',
        message: 'No se actualizarón los datos'
      })
      console.error(error)
    })
  }catch(error){
    console.error(error)
  }
}

onMounted(()=>{
  getIventoryMethod()
  getSupplierMethod()
})
</script>

<style scoped>

</style>
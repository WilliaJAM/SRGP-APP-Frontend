<template>
    <LayoutMain>
        <template #slotUno>
            <Header
            :title="'Productos'"
            :titleButton="'Nuevo producto'"
            :open="showForm"
            v-show="hideContent"
            />

            <Forms
            v-model:is-open="openForm"
            v-model:is-close="hideContent"
            :isEdit="isEdit"
            :titleForm="'Producto'"
            @save="validation"
            >
                <template #slotForm>
                    <productForm ref="referenceF" :inventory="getInventory" :category="getCategory"/>
                </template>                
            </Forms>
                <el-card v-show="hideContent" v-for="item in getProduct" style="max-width: 100%; margin-bottom: 10px;">
                    <template #header>
                        <div class="card-header">
                            <span>Nombre del Producto: {{findInventoryName(item.inventory_id)}}</span> 
    
                        </div>
                    </template>
                    <img
                        :src="item.image"
                        style="width: 30%; transform: translate(300px);border-radius: 10px;"
                        />
                        <p>Categoria: {{ findCategoryName(item.category_id) }}</p>
                        <p>Descripción: {{ item.description }}</p>
                        <p>Dimensiones: {{ item.dimensions }}</p>
                        <p>Estado: <el-tag v-bind:type="badge(item.status)" size="large" effect="dark">{{ item.status }}</el-tag></p>
                    <template #footer>
                        <div style="display: flex;justify-content: space-between; padding-top: 10px; padding-bottom: 10px;" >
                            Precio: ${{item.price}}
                            <div class="actionsButtons"> 
                                <el-button link type="primary" size="default" :icon="Edit" @click="editTable()"></el-button>
                            <el-button link type="danger" size="default" :icon="Delete" @click="deleteProduct(item.id)"></el-button>
                            </div>
                        </div>
                    </template>
                </el-card>
        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import productForm from './components/productForm.vue'
import Forms from '../../components/Forms.vue';
import {
Edit,
Delete

} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';


const openForm= ref(false)
const hideContent= ref(true)
const isEdit= ref(null)
const referenceF = ref(null)

const findInventoryName = (inventoryId) => {
  const inventory = getInventory.value.find(item => item.id === inventoryId);
  return inventory ? inventory.name : 'Sin inventario';
};

const findCategoryName = (categoryId) => {
  const category = getCategory.value.find(item => item.id === categoryId);
  return category ? category.name : 'Sin inventario';
};

const badge = (status)=>{
    if(status === "Disponible"){
        return "success"
    }else if(status === "No disponible"){
        return "danger"
    }
}

const showForm = async () =>{
    openForm.value =true 
    hideContent.value = false
    isEdit.value = false
}

const editTbale = async () =>{
    showForm()
    isEdit.value = true
}

const validation = async ()=>{
    const validate = await referenceF.value.runRules(referenceF.value.referenceForm)

    if(validate){
        createProduct()
    }
}

const createProduct = async ()=>{

    const url = 'http://127.0.0.1:8000/api/product/save'
    const data= {
        price: referenceF.value.dataForm.price,
        image: referenceF.value.dataForm.image,
        description: referenceF.value.dataForm.description,
        dimensions: referenceF.value.dataForm.dimensions,
        status: referenceF.value.dataForm.status,
        id_product:referenceF.value.dataForm.id_product ,
        inventory_id: referenceF.value.dataForm.inventory_id,
        category_id: referenceF.value.dataForm.category_id,
}
    try{
        axios.post(url, data)
    .then(function(response){
        referenceF.value.clearForm()
        getProductMethod()
        ElMessage({
            message: `Se creó el producto`,
            type: 'success',
            plain: false,
        })
        console.log(response);
    })

    .catch(function(error){
        ElMessage({
            message: `No se creó el producto`,
            type: 'warning',
            plain: false,
        })
        console.error(error)
    })
    }catch(error){
        console.error(error)
    }
    }

const getProduct = ref([])

const getProductMethod = async ()=>{
    const url = 'http://127.0.0.1:8000/api/product/get'

    try{
        axios.get(url)
    .then(function(response){
        getProduct.value= response.data.result
        console.log(response);
    })

    .catch(function(error){
        console.error(error)
    })
    }catch(error){
        console.error(error)
    }
}

const deleteProduct = async (id)=>{
    const url = 'http://127.0.0.1:8000/api/product/delete'

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
    .then(function (response){
        getProductMethod() 
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

const getInventory = ref([])
const getIventoryMethod = async()=>{
const url = 'http://127.0.0.1:8000/api/invetory/get'

try{
  axios.get(url)
  .then(function(response){
    getInventory.value= response.data.result
    console.log(getInventory.value);
  console.log(response);
  })

  .catch(function(error){
  console.error(error)
})
}catch(error){
  console.error(error)

}

}


const getCategory = ref([])
const getCategoryMethod = async ()=>{
    const url = 'http://127.0.0.1:8000/api/category/get'
try{
    axios.get(url)
.then(function (response){
    getCategory.value = response.data.result
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
    getIventoryMethod()
    getCategoryMethod()
    getProductMethod()
})
</script>

<style scoped>

</style>
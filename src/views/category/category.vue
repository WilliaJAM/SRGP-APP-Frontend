<template>
    <LayoutMain>
        <template #slotUno>
            <Header
            :title="'Categorias'"
            :titleButton="'Nueva categoria'"
            :open="showForm"
            v-show="hideContent"
            />

            <Forms
            :titleForm="'Categoria'"
            v-model:is-open="openForm"
            v-model:is-close="hideContent"
            :isEdit="isEdit"
            @save="validations"
            @update="validationsUpdate"
            >
                <template #slotForm>
                    <categoryForm 
                    ref="referenceF"
                    :dataValue="getData"
                    />
                </template>
            </Forms>

            <el-table :data="objectCategory" style="width: 100%" v-show="hideContent">
                <el-table-column prop="id" label="Id" />
                <el-table-column prop="name" label="Nombre" />
                <el-table-column fixed="right" label="Operaciones">
                    <template #default="tableData">
                    <el-button link type="primary" :icon="Edit" @click="editTable(tableData.row.id)" size="default"></el-button>
                    <el-button link type="danger" :icon="Delete" @click="deleteCategory(tableData.row.id)" size="default"></el-button>
                </template>
                </el-table-column>
            </el-table>


        </template>
    </LayoutMain>
</template>

<script setup>
import axios from 'axios';
import Forms from '../../components/Forms.vue';
import Header from '../../components/Header.vue';
import LayoutMain from '../../components/LayoutMain.vue';
import categoryForm from './components/categoryForm.vue'
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { ElMessage , ElMessageBox} from 'element-plus';


const openForm = ref(false)
const hideContent = ref(true)
const isEdit= ref(null)

const referenceF = ref(null)

const getData = ref()

const showForm = async () =>{
    openForm.value = true
    hideContent.value = false
    isEdit.value = false
}

const editTable = async (id) =>{
    showForm()
    getData.value = await getCategoryById(id)
    isEdit.value = true
}

const validations = async ()=>{
    const validate = await referenceF.value.runRules(referenceF.value.formRef)

    if(validate){
        createCategory()
    }
}

const createCategory = async ()=>{
    const url = 'http://127.0.0.1:8000/api/category/save'

    const data = {
        name: referenceF.value.dataForm.name
    }
    try{
        axios.post(url, data)
    .then(function (response){
        getCategory()
        referenceF.value.clearFileds()
        ElMessage({
    message: `Se creó la categoria`,
            type: 'success',
            plain: false,
    })
        console.log(response)
    })
    .catch(function(error){
        ElMessage({
    message: `No see creó la categoria`,
            type: 'warning',
            plain: false,
    })
        console.error(error)
    })
    }catch(error){
        console.error(error)
    }
}

const objectCategory = ref([])

const getCategory = async ()=>{
    const url = 'http://127.0.0.1:8000/api/category/get'
try{
    axios.get(url)
.then(function (response){
    ElMessage({
            type: 'info',
            message: "Se cargaron los datos"
        })
    objectCategory.value = response.data.result
    console.log(response)
})
.catch(function(error){
    console.error(error)
})
}catch(error){
    console.error(error)
}
}


const deleteCategory = async (id)=>{

    const url = 'http://127.0.0.1:8000/api/category/delete'

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
        getCategory() 
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

const getCategoryById = async (id)=>{

    const url = 'http://127.0.0.1:8000/api/category/getDataById'

    try{
        const response = axios.get(url, { params: {id: id} })

    return (await response).data.result

    // axios.get(url,{params: {id: id}})

    // .then(function(response){
    //     console.log(response);
    // })

    // .catch(function(error){
    //     console.error(error)
    // })
    }catch(error){
        console.error(error)
    }
}

const validationsUpdate = async ()=>{

    const validation = await referenceF.value.runRules(referenceF.value.formRef)

    if(validation){
        updateCategory()
    }
}

const updateCategory = async ()=>{

    const url = 'http://127.0.0.1:8000/api/category/update'

    const updateInfo = {
        id: getData.value[0].id,
        name: referenceF.value.dataForm.name
    }

    try{

        axios.put(url, updateInfo)

        .then(function(response){
            getCategory()
            showForm()
            ElMessage({
                type: 'success',
                message: 'Se actualizo satisfactoriamente'
            })
            console.log(response);
        })

        .catch(function(error){
            console.error(error)
        })

    }catch(error){
        console.error(error)
    }
}

onMounted(()=>[
getCategory()
])
</script>

<style scoped>

</style>
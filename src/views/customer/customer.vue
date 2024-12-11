<template>
    <LayoutMain>
        <template #slotUno>
            
            <Header
            :title ="'Clientes'"
            :titleButton = "'Nuevo cliente'"
            :open="openForm"
            v-show="hideContent"
            />

            <Forms
            v-model:is-open="showForm"
            v-model:is-close="hideContent"
            :isEdit = "isEdit"
            :titleForm="'Clientes'"
            @save="validate"
            @update="validationsForUpdate"
            >
                <template #slotForm>
                    <customerForm ref="referenceF" 
                    :city="getCities" 
                    :rol="getRol"
                    :dataValue="getData"
                    />
                </template>
            </Forms>

            <el-table :data="getCustomer" style="width: 100%" v-show="hideContent">
                    <el-table-column prop="name" label="Nombre" width="140"/>
                    <el-table-column prop="documentType" label="Tipo de documento" width="140"/>
                    <el-table-column prop="identificationNumber" label="N° Identificación" width="140"/>
                    <el-table-column :formatter="formatCustomerName" label="Tipo" width="140"/>
                    <el-table-column prop="email" label="Email" width="140"/>
                    <el-table-column prop="phone" label="Telefono" width="140"/>
                    <el-table-column :formatter="formatCityName" label="Ciudad" width="140"/>
                    <el-table-column prop="neighborhood_name" label="Barrio" width="140"/>
                    <el-table-column prop="address" label="Direccion" width="140"/>
                    <el-table-column fixed="right" label="Operaciones" width="140">
                        <template #default="dataTable">
                            <el-button link type="primary" size="default" :icon="Edit" @click="editTable(dataTable.row.id)"></el-button>
                            <el-button link type="danger" size="default" :icon="Delete" @click="deleteUser(dataTable.row.id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </template>
    </LayoutMain>
</template>
<script setup>
import LayoutMain from '../../components/layoutMain.vue';
import Header from '../../components/Header.vue';
import Forms from '../../components/Forms.vue';
import customerForm from './components/customerForm.vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'
import {
Edit,
Delete
} from '@element-plus/icons-vue'

const showForm = ref(false)
const hideContent = ref(true)
const isEdit = ref(null)

const referenceF = ref(null)

const getData = ref()

const openForm = async () =>{
    showForm.value = true
hideContent.value =  false
isEdit.value = false
}

const editTable = async (id) =>{
    openForm()
    getData.value = await getCustomerById(id)
    isEdit.value = true

}
const formatCustomerName = (row) => {
    const rol = getRol.value.find(rol => rol.id === row.rol_id);
    return rol ? rol.name : 'No asignado'; 
}

const formatCityName = (row) => {
    const city = getCities.value.find(item => item.id === row.city_id);
    return city ? city.name : 'No asignado'; 
}

const validate = async ()=>{
    const validation = await referenceF.value.validateForm(referenceF.value.formRef)

    if(validation){
        createCustomer()
    }
}

const createCustomer = async ()=>{

    const url= 'http://127.0.0.1:8000/api/customer/save'

    const data= {
        name: referenceF.value.dataForm.name,
        documentType: referenceF.value.dataForm.type_docment,
        identificationNumber: referenceF.value.dataForm.identificationNumber,
        email: referenceF.value.dataForm.email,
        phone: referenceF.value.dataForm.phone,
        type_phone: referenceF.value.dataForm.type_phone,
        neighborhood_name: referenceF.value.dataForm.neighborhood_name,
        address: referenceF.value.dataForm.address,
        city_id: referenceF.value.dataForm.city_id,
        rol_id: referenceF.value.dataForm.rol_id
    }

    try{
        axios.post(url, data)
        .then(function(response){
            referenceF.value.clearFormInputs()
            getCustomerMethod()
            ElMessage({
        message: `Se  creo el cliente`,
        type: 'success',
        plain: false,
    })
            console.log(response)
        })

        .catch(function(error){
            ElMessage({
        message: `No se creo el cliente ${error}`,
        type: 'warning',
        plain: false,
    })
            console.error(error)
        })
    }catch(error){
        console.error(error)
    }


}

const deleteUser = async(id)=>{
    const url = 'http://127.0.0.1:8000/api/customer/delete'

    ElMessageBox.confirm(
        'Seguro que desea eliminar, esta acción no se puede deshacer?',
'Warning',
{
  confirmButtonText: 'Continuar',
  cancelButtonText: 'Cancelar',
  type: 'warning',
}
)
.then(()=>{
    try{
        axios.delete(url, {data:{id}})
        
        .then(function(response){
            getCustomerMethod()
            console.log(response)
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

const getCustomer = ref([])

const getCustomerMethod = async ()=>{
    const url = 'http://127.0.0.1:8000/api/customer/get'

try{
    axios.get(url)
    .then(function(response){
        ElMessage({
            type: 'info',
            message: "Se cargaron los datos"
        })
        getCustomer.value = response.data.result
        console.log(response)
    })

    .catch(function(error){
        console.error(error)
    })
}catch(error){
    console.error(error)
}
}

const getCities = ref([])

const getCity = async ()=>{
    const url = 'http://127.0.0.1:8000/api/city/get'

    try{
        axios.get(url)
        .then(function(response){
            getCities.value = response.data.result
            console.log(response)
        })

        .catch(function(error){
            console.error(error)
        })
    }catch(error){
        console.error(error)
    }
}


const getRol = ref([])

const getRolMethod = async ()=>{
    const url = 'http://127.0.0.1:8000/api/rol/get'

try{
    axios.get(url)
    .then(function(response){
        getRol.value = response.data.result
        console.log(response)
    })

    .catch(function(error){
        console.error(error)
    })
}catch(error){
    console.error(error)
}
}

const getCustomerById = async (id)=>{
    const url = 'http://127.0.0.1:8000/api/customer/getDataById'

    try{
        const response = axios.get(url, {params: {id: id}}) 

        return (await response).data.result
    }catch(error){
        console.error(error)
    }
}

const validationsForUpdate = async ()=>{
    
    const validation = await referenceF.value.validateForm(referenceF.value.formRef)

    if(validation){
        updateCustomer()
    }
}



const updateCustomer = async ()=>{
    const url = 'http://127.0.0.1:8000/api/customer/update'
    const updateInfo = {
    id: getData.value[0].id,
    name: referenceF.value.dataForm.name,
    email: referenceF.value.dataForm.email,
    documentType: referenceF.value.dataForm.type_docment,
    identificationNumber: referenceF.value.dataForm.identificationNumber,
    phone: referenceF.value.dataForm.phone,
    type_phone: referenceF.value.dataForm.type_phone,
    city_id: referenceF.value.dataForm.city_id,
    address: referenceF.value.dataForm.address,
    neighborhood_name: referenceF.value.dataForm.neighborhood_name,
    rol_id: referenceF.value.dataForm.rol_id
    }
    try{
        axios.put(url, updateInfo)

        .then(function(response){
            getCustomerMethod()
            showForm.value = false
            hideContent.value =  true
            referenceF.value.clearFormInputs()
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
    getCity()
    getRolMethod()
    getCustomerMethod()
})
</script>

<style scoped>

</style>
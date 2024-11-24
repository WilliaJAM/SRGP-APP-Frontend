<template>
    <LayoutMain>
        <template #slotUno>

            <!-- el header tiene el titulo y el boton con la funcion de ocultar -->
            <Header
                :title="'Paises'"
                :titleButton="'Crear pais'"
                :open="openForm"
                v-show="hideForm"
                />


                <!-- el form tiene los botones de guardar y cancelar, almacena el formulario de contryForm -->
                <Forms 
                :titleForm="'Paises'"
                v-model:is-open="showForm"
                v-model:is-close="hideForm"
                :is-edit="isEdit"
                @save="validations"
                >
            <template #slotForm>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- solo es el formulario de country -->
                <countryForm
                v-model:is-open="showForm"
                ref="referenceComponent"
                />
                    </el-col>
                </el-row>
            </template>

                </Forms>

                <el-table :data="getDataObject" style="width: 100%" v-show="hideForm">
                    <el-table-column prop="name" label="Nombre" />
                    <el-table-column prop="code" label="Codigo" />
                    <el-table-column prop="three_letter_code" label="Codigo de tres letras" />
                    <el-table-column prop="currency" label="Moneda"/>
                    <el-table-column prop="telephone_prefix" label="Prefijo"/>
                    <el-table-column fixed="right" label="Operaciones" >
                        <template #default>
                            <el-button link type="primary" size="default" :icon="Edit" @click="editDataTable"></el-button>
                            <el-button link type="danger" size="default" :icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import Forms from '../../components/Forms.vue';
import countryForm from './components/countryForm.vue';
import Header from '../../components/Header.vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus'


//variables para ocultar y mostrar
const showForm = ref(false);
const hideForm = ref(true);

//variable que cambia el nombre del boton
const isEdit = ref(null);

//cambia el valor para que se meustre 
const openForm = () => {
    showForm.value = true;
    hideForm.value = false;
    isEdit.value = false;
}
//aqui ejecuta la funcion de openForm y cambia el valor de la variable
const editDataTable=  async() => {
    openForm();
    isEdit.value = true;


};

const referenceComponent = ref(null);

const validations = async () =>{
    const validate = await referenceComponent.value.runRules(referenceComponent.value.refForm);
    
    if(validate){
        createCountry()
    }
}


const createCountry = async ()=>{
    const data = {
    name: referenceComponent.value.dataForm.name,
    code: referenceComponent.value.dataForm.code,
    three_letter_code: referenceComponent.value.dataForm.threeLetterCode, 
    currency: referenceComponent.value.dataForm.currency,
    telephone_prefix: referenceComponent.value.dataForm.telephonePrefix, 
}

    const url = 'http://127.0.0.1:8000/api/country/save'

    try {
        axios.post(url, data)
    .then(function (response) {
    console.log(response);
    ElMessage({
    message: `Se creó el pais`,
    type: 'success',
    plain: false,
  })
    referenceComponent.value.resetForm()
    })
    .catch(function (error) {
        console.error(error)
        ElMessage({
    message: `No se creo el rol ${error}`,
    type: 'warning',
    plain: false,
  })
    });
    }catch(error){
        console.error(error)
    }
}

const updateCountry = async () =>{

}
const deleteCountry = async () =>{
    
}

const getDataObject = ref([]);


const getCountry = async () =>{

    const url = 'http://127.0.0.1:8000/api/country/get'

     try {
        axios.get(url)
    .then(function (response) {
        getDataObject.value = response.data.result
        console.log(response)
    })
    .catch(function (error) {
        console.error(error)
    });
    }catch(error){
        console.error(error)
    }
}

onMounted(() =>{
    getCountry()
})


</script>

<style scoped>

</style>
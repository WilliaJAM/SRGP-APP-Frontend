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
                >
            <template #slotForm>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- solo es el formulario de country -->
                <countryForm
                v-model:is-open="showForm"
                />
                    </el-col>
                </el-row>
            </template>

                </Forms>

                <el-table :data="tableData" style="width: 100%" v-show="hideForm">
                    <el-table-column prop="name" label="Nombre" width="130"/>
                    <el-table-column prop="code" label="Codigo" width="130"/>
                    <el-table-column prop="threeCodeLetter" label="Codigo de tres letras" width="180"/>
                    <el-table-column prop="currency" label="Moneda"/>
                    <el-table-column prop="phonePrefix" label="Prefijo"/>
                    <el-table-column fixed="right" label="Operaciones" min-width="120">
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
import { ref } from 'vue';



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


const tableData= [
    {
        name : 'Colombia' ,
        code: '40000',
        threeCodeLetter: 'COL' ,
        currency: 'COP',
        phonePrefix: '+57',
    },
    {
        name : 'Colombia' ,
        code: '40000',
        threeCodeLetter: 'COL' ,
        currency: 'COP',
        phonePrefix: '+57',
    },
    {
        name : 'Colombia' ,
        code: '40000',
        threeCodeLetter: 'COL' ,
        currency: 'COP',
        phonePrefix: '+57',
    },
]


</script>

<style scoped>

</style>
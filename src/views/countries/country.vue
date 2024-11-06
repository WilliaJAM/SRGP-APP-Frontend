<template>
    <LayoutMain>
        <template #slotUno>

            <div class="container">
                <Forms>

            <template #slotForm>
                <countryForm>

                </countryForm>
            </template>

                </Forms>

                <Header
                :title="'Modulo Paises'"
                :titleButton="'Crear pais'"
                :open = "openForm"
                >

                </Header>

                <el-table :data="tableData" style="width: 100%" v-show="isVisible">
                    <el-table-column prop="name" label="Nombre" width="130"/>
                    <el-table-column prop="code" label="Codigo" width="130"/>
                    <el-table-column prop="threeCodeLetter" label="Codigo de tres letras" width="180"/>
                    <el-table-column prop="currency" label="Moneda"/>
                    <el-table-column prop="phonePrefix" label="Prefijo"/>
                    <el-table-column fixed="right" label="Operaciones" min-width="120">
                        <template #default>
                            <el-button link type="primary" size="default" :icon="Edit" @click="handleClick"></el-button>
                            <el-button link type="danger" size="default" :icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>


            </div>
        </template>

    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue'
import Forms from '../../components/Forms.vue';
import countryForm from './components/countryForm.vue';
import Header from '../../components/Header.vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue';


const showForm = ref(false)

const openForm = () => {
    showForm.value = true;
    console.log(showForm.value);
}

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

const isVisible = ref(true)

</script>

<style scoped>

</style>
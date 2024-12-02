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
            :title="'Categoria'"
            v-model:is-open="openForm"
            v-model:is-close="hideContent"
            :isEdit="isEdit"
            >
                <template #slotForm>
                    <categoryForm/>
                </template>
            </Forms>

            <el-table :data="tableData" style="width: 100%" v-show="hideContent">
                <el-table-column prop="name" label="Nombre" />
                <el-table-column fixed="right" label="Operaciones">
                    <template #default>
                    <el-button link type="primary" :icon="Edit" @click="editTable" size="default"></el-button>
                    <el-button link type="danger" :icon="Delete" size="default"></el-button>
                </template>
                </el-table-column>
            </el-table>


        </template>
    </LayoutMain>
</template>

<script setup>
import Forms from '../../components/Forms.vue';
import Header from '../../components/Header.vue';
import LayoutMain from '../../components/LayoutMain.vue';
import categoryForm from './components/categoryForm.vue'
import {
Edit,
Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue';

const tableData = [
    {name: 'Hola XD'}
];

const openForm = ref(false)
const hideContent = ref(true)
const isEdit= ref(null)

const showForm = async () =>{
    openForm.value = true
    hideContent.value = false
    isEdit.value = false
}

const editTable = async () =>{
    showForm()
    isEdit.value = true
}

</script>

<style scoped>

</style>
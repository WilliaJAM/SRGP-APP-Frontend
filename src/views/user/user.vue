<template>
    <LayoutMain>

        <template #slotUno>
            <Header
            :title="'Usuarios'"
            :titleButton="'Nuevo usuario'"
            :open="openForm"
            v-show="hideContent"
            />

            <Forms
            v-model:is-open="showForm"
            v-model:is-close="hideContent"
            :isEdit="isEdit"
            >
                <template #slotForm>
                    <userForm/>
                </template>
            </Forms>

            <el-table :data="tableData" style="width: 100%" v-show="hideContent">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/layoutMain.vue';
import Header from '../../components/Header.vue';
import Forms from '../../components/Forms.vue';
import userForm from './components/userForm.vue'
import { ref } from 'vue';

const showForm = ref(false)
const hideContent = ref(true)
const isEdit = ref(null)


const openForm = async ()=>{
    showForm.value = true
    hideContent.value = false
    isEdit.value = false
}

const editTable = async ()=>{
    openForm()
    isEdit.value = false
}

</script>

<style scoped>

</style>
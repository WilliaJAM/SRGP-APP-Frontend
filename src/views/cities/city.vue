<template>
    <LayoutMain>
        <template #slotUno>
            <Header
            :title="'Ciudades'"
            :titleButton="'Nueva ciudad'"
            :open="isVisble"
            v-show="hideForm"
            >

            </Header>

            <Forms
            :titleForm="'Ciudades'"
            v-model:is-open ="openForm"
            v-model:is-close = "hideForm"
            :isEdit="isEdit"
            >
                <template #slotForm>
                    <cityForm/>
                </template>
            </Forms>
            <el-table :data="tableData" style="width: 100%" v-show="hideForm">
    <el-table-column prop="name" label="Nombre" />
    <el-table-column prop="code" label="Codigo" />
    <el-table-column prop="department_id" label="Departementos" />
    <el-table-column fixed="right" label="Operaciones">
      <template #default>
        <el-button link type="primary" :icon="Edit" size="default" @click="editTable"> </el-button>
        <el-button link type="danger" :icon="Delete" size="default"></el-button>
      </template>
    </el-table-column>
  </el-table>

        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import cityForm from './components/cityForm.vue'
import Forms from '../../components/Forms.vue';
import Header from '../../components/Header.vue';
import { ref } from 'vue';
import {
Edit,
Delete
} from '@element-plus/icons-vue'


const openForm = ref(false);
const hideForm = ref(true);
const isEdit = ref(null);


const isVisble = async () =>{
    openForm.value = true
    hideForm.value = false
    isEdit.value = false
}

const editTable =async () =>{
    isVisble()
    isEdit.value= true
}


const tableData = [
  {
    name: '2016-05-03',
    code: 'Tom',
    department_id: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '2016-05-02',
    code: 'Tom',
    department_id: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '2016-05-04',
    code: 'Tom',
    department_id: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '2016-05-01',
    code: 'Tom',
    department_id: 'No. 189, Grove St, Los Angeles',
  },
]

</script>

<style scoped>

</style>
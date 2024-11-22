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
          :titleForm="'Paises'"
          v-model:is-open="showForm"
          v-model:is-close="hideForm"
          :is-edit="isEdit"
          >
            <template #slotForm>
              <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- solo es el formulario de country -->
                <inventoryForm
                v-model:is-open="showForm"
                />
              </el-col>
            </el-row>
            </template>
          </Forms>

            <el-table :data="tableData" style="width: 100%"   v-show="hideForm">
        <el-table-column prop="stock" label="Disponibilidad" width="180" />
    <el-table-column prop="date" label="Fecha de entrada" width="180" />
    <el-table-column prop="name" label="Nombre del producto" width="180" />
    <el-table-column prop="calibrate" label="Calibre" width="180" />
    <el-table-column prop="address" label="Cantidad" />
    <el-table-column fixed="right" label="Gestion" min-width="120">
      <template #default>
        <el-button link type="primary" :icon="Edit" size="default" @click="editDataTable"></el-button>
        <el-button link type="danger" :icon="Delete" size="default" @click="" ></el-button>
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
import { ref } from 'vue';

const showForm = ref(false);
const hideForm = ref(true);
const formRef = ref()

const isEdit = ref(null);

const openForm = () => {
    showForm.value = true;
    hideForm.value = false;
    isEdit.value = false;

//cambia el valor de la variable resetButton
    if(resetButton.value == false){
      resetButton.value = true
    }
    

}

const resetButton = ref(true);
const asd = () => {
  resetButton.value = false;
}


const editDataTable=  async() => {
    openForm();
    asd();
    isEdit.value = true;


};

const tableData = [
  {
    calibrate: '20',
    stock: 'Disponible',
    date: '2016-05-03',
    name: 'Perfil 3/4',
    address: '100',
  },
  {
    calibrate: '20',
    stock: 'Disponible',
    date: '2016-05-03',
    name: 'Angulo de pulgada',
    address: '10',
  },
  {
    calibrate: '20',
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    calibrate: '20',
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    calibrate: '20',
    calibrate: '20',
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    calibrate: '20',
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    calibrate: '20',
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  {
    calibrate: '20',
    stock: 'Agotado',
    date: '2016-05-03',
    name: 'Barilla 11mm',
    address: '0',
  },
  
]
</script>

<style scoped>

</style>
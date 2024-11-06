<template>
    <LayoutMain>
        <template #slotUno>

          <Forms
          :titleForm="'Paises'"
          >

            <template #slotForm>
              <inventoryForm/>
            </template>
          </Forms>
            <Header
            :title="'Inventario'"
            :titleButton="'Nuevo Elemento'"
            >


            </Header>
            <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="stock" label="Disponibilidad" width="180" />
    <el-table-column prop="date" label="Fecha de entrada" width="180" />
    <el-table-column prop="name" label="Nombre del producto" width="180" />
    <el-table-column prop="calibrate" label="Calibre" width="180" />
    <el-table-column prop="address" label="Cantidad" />
    <el-table-column fixed="right" label="Gestion" min-width="120">
      <template #default>
        <el-button link type="success" :icon="Edit" size="medium" @click="handleClick"></el-button>
        <el-button link type="danger" :icon="Delete" size="medium" @click="handleClick" ></el-button>
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

const handleClick = () => {
  console.log('true')
}

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
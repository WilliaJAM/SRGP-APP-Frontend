<template>
    <LayoutMain>
        <template #slotUno>
    <DynamicTitle
    :dynamicTitle="'Modulo de ventas'"
    >
        <template #slotButton>
            <el-button type="primary" @click="gotoPage">Mas detalles de las compras</el-button>
        </template>
    </DynamicTitle>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        </el-table>

        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import DynamicTitle from '../../components/DynamicTitle.vue';


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped>

</style>
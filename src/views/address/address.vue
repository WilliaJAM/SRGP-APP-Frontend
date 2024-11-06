<template>

    <LayoutMain>
        <template #slotUno>
          <DynamicTitle
          :dynamicTitle ="'Tabla de Direcciones de usuarios'"
          
          >

          </DynamicTitle>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="country" label="Pais" />
                <el-table-column prop="department" label="Departemento" />
                <el-table-column prop="city" label="Ciudad" />
                <el-table-column prop="neighborhood" label="Barrio" />
                <el-table-column prop="address" label="Direccion" />
                
            </el-table>
        </template>

    </LayoutMain>

</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue'
import addressForm from './components/addressForm.vue';
import DynamicTitle from '../../components/DynamicTitle.vue';
const tableData = [
  {
    country : 'Colombia',
    department: 'Huila',
    city : 'Tesalia',
    neighborhood : 'Inspeccion de Pacarní',
    address: 'CL 5 #7-15 ',
  },
  
]
</script>

<style scoped>
.el-table{
    text-align: center;
}
</style>
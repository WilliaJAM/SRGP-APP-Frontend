<template>
  <el-form>
    <el-form-item label="Nombre del Material">
      <el-input  placeholder="Ingrese el nombre" />
    </el-form-item>
    <el-form-item label="Cantidad">
      <el-input type="Number" />
    </el-form-item>
    <el-form-item label="Fecha de entrada">
      <el-date-picker
      placeholder="Ingrese fecha"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="Calibre">
      <el-select
      v-model="value"
      >
      <el-option
      v-for="items in options"
      :key="items.value"
      :label="items.label"
      :value="items.value"
      >

      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Seleciones proveedor">
      <el-select>
        <el-option 
        v-for="items in suppliers"
        :name = "items.name"
        :value="items.value"
        >

        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'


const value = ref('')

const options=[
{
  label: '7',
  value: 7
},

]

const suppliers=[
  {
    name:  'DistriMeltan',
    value : 'DistriMeltan'
  }
]


</script>

<style scoped>
  .el-form{
    background-color: gray;
    border-radius: 8px;
    width: 890px ;
text-align: left;

    margin-bottom: 20px;
    padding: 20px;
  }

</style>
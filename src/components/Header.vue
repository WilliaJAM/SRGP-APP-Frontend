<template>
  <div class="container">
    <div class="container__header">
        <h2 class="container__title">Modulo de {{ title }}</h2>
        <el-row justify="center" align="middle">
          <el-button type="primary" :icon="Plus" @click="open" class="button">
            {{ titleButton }}
          </el-button>
        </el-row>
      </div>
  </div>

</template>


<script setup>

import {
Plus,
} from '@element-plus/icons-vue' //importa los iconos
import { ref } from 'vue';



defineProps({
title: {String,  required: true},
titleButton: {String,  required: true},
open:{
  type: Function,
  required: true
},
})

</script>


<style scoped>

.button{
  background-color: #3C3D3F;
  color: white;
  border: none ;
  padding: 15px;
}
.button:hover{
  background-color: #6b6c6e;
} 
.container {
    margin-bottom: 10px;
  }
  
.container__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid rgb(238, 233, 233);
}
  
  

</style>
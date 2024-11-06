<template>
  <div class="container">
      <h2>Modulo de {{ title }}</h2>
      <el-button type="success" :icon="Plus" id="button" @click="open">{{ titleButton }}</el-button>
  </div>

</template>


<script setup>

import {
Plus,

} from '@element-plus/icons-vue' //importa los iconos



defineProps({
title: String,
titleButton: String,
open:{
  type: Function
}

})


</script>


<style scoped>

.container{
display: flex;
justify-content: space-between;
}

.container > .el-button{
position: relative;
top: 15px;
}



</style>
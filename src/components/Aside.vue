<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Shop,
  SetUp,
  DocumentChecked,
  List,
  UserFilled,
  Handbag
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>


<template>
  
      <el-menu
        active-text-color="#658EF0"
        background-color="#3C3D3F"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
      <el-menu-item index="3">
          <el-icon><Shop /></el-icon>
          <span>Tienda</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>Administracion</span>
          </template>
          <el-menu-item index="1-2">
            <el-icon><List/></el-icon>
            Inventario
          </el-menu-item>
          <el-menu-item index="1-3">
            <el-icon><UserFilled/></el-icon>
            Proveedores
          </el-menu-item>
          <el-menu-item index="1-4" >
            <el-icon><DocumentChecked/></el-icon>
            Roles
          </el-menu-item>
          <el-menu-item index="1-5" >
            <el-icon><Handbag/></el-icon>
            Productos
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
          <el-icon><SetUp/></el-icon>
            <span>Gestion</span>
          </template>
          <el-menu-item-group title="Gestion de ubicaciones">
            <el-menu-item index="2-2">Paises</el-menu-item>
            <el-menu-item index="2-3">Departamentos</el-menu-item>
            <el-menu-item index="2-4">Direcciones</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Gestion de usuarios">
            <el-menu-item index="2-5">Personas</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    
</template>


<style scoped>
 html, body {
    margin: 0;
    padding: 0;
    /* height: 100%; */
  }
  
  .sidebar {
    height: 100vh;
    overflow-y: auto; 
  }
  
  .el-menu-vertical-demo {
    height: 100%; 
    width: 80%;
  }

</style>
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Shop,
  SetUp,
  DocumentChecked,
  List,
  UserFilled,
  Handbag,
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
      default-active="$route.path"
      router
        active-text-color="#658EF0"
        background-color="#3C3D3F"
        class="el-menu-vertical-demo"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>Administracion</span>
          </template>
          <el-menu-item index="/inventory">
            <el-icon><List/></el-icon>
            Inventario
          </el-menu-item>
          <el-menu-item index="/supplier">
            <el-icon><UserFilled/></el-icon>
            Proveedores
          </el-menu-item>
          <el-menu-item index="/rol" >
            <el-icon><DocumentChecked/></el-icon>
            Roles
          </el-menu-item>
          <el-menu-item index="/product" >
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
            <el-menu-item index="/countries">Paises</el-menu-item>
            <el-menu-item index="/deparment">Departamentos</el-menu-item>
            <el-menu-item index="/cities">Ciudades</el-menu-item>
            <el-menu-item index="/address">Direcciones</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Gestion de usuarios">
            <el-menu-item index="/user">Usuarios</el-menu-item>
            <el-menu-item index="/customer">Clientes</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Gestion de categoria">
            <el-menu-item index="/category">Categorias</el-menu-item>
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
  /* esta regla tiene la clase que contiene todo el aside */
  .el-menu-vertical-demo {
    min-height: 100%; 
    width: 230px;
  }
  .routes{
    text-decoration: none;
    color: white;
  }

</style>
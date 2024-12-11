<template>
 <el-menu
    default-active="$route.path"
    router
    active-text-color="#658EF0"
    background-color="#3C3D3F"
    text-color="#fff"
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="/">
      <img
        style="width: 100px"
        src=""
        alt="SRGP"
      />
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <p>William Johan Artunduaga Marinez</p>
      </template>
      <div class="items">
        <el-menu-item index="2-1">Perfil</el-menu-item>
      <el-menu-item index="2-2">Cerrar Sesion</el-menu-item>
      </div>
    </el-sub-menu>
  </el-menu>


</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    const activeIndex = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
      if(key== "2-2"){
        alert('Cerrar Sesion?')
      }
}


</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
}

.avatarUser{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.items{

  padding: 5px;
}

</style>
<script setup>
import Aside from './Aside.vue';
import NavBar from './NavBar.vue';
</script>


<template>
    <el-container>
        <el-header>
                <NavBar class="navbar"/>
        </el-header>
        <el-container>
            <el-aside style="width: 230px;">
            <Aside/>
        </el-aside>
        <el-main class="main-content">
            <slot name="slotUno">

            </slot>
        </el-main>
        </el-container>
    </el-container>

</template>

<style scoped>
    .el-header{
        padding: 0;
    }

    .el-container{
        height: 100vh;
    } 

    .main-cotent{
        position: relative;
    } 
</style>
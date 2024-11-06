<script setup>
import Aside from './Aside.vue';
import NavBar from './NavBar.vue';
</script>


<template>
    <el-container style="height: 100vh;">
        <el-header>
                <NavBar class="navbar"/>
        </el-header>
        <el-container>
            <el-aside>
            <Aside/>
        </el-aside>
        <el-main>
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

</style>
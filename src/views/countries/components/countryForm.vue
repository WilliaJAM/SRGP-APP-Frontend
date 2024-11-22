<template>
    <el-card style="max-width: 100%">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form>
                    <el-form-item label="Nombre">
                        <el-input v-model="input" lable="asdk" style="width: 240px" name="input" placeholder="Please input" />

                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { ref } from 'vue';


const input = ref('');

</script>
<style scoped>

</style>
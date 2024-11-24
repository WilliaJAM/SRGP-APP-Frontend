<template>
    <el-card style="max-width: 100%">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>


const props = defineProps({
    array: {
        type: Array,
        required: true
    }
})

</script>
<style scoped>
  
.el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);

}
</style>
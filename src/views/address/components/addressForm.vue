<template>
    <el-card style="max-width: 100%">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form
                ref="referenceForm"
                :model="dataForm"
                :rules="rules"
                class="demo-ruleForm"
                :size="formZize"
                status-icon
                style="width: 90%;"
                label-width="auto"
                >
                <el-form-item label="Nombre del barrio" prop="name">
                    <el-input v-model="dataForm.name"/>
                </el-form-item>
                <el-form-item label="Dirección" prop="address">
                    <el-input v-model="dataForm.address"/>
                </el-form-item>
                <el-form-item label="Ciudad" prop="city">
                    <el-select v-model="dataForm.city_id" placeholder="Activity zone">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                </el-form>
                <el-button type="success" @click="runRules(referenceForm)">Ejecutar reglas</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
    array: {
        type: Array,
        required: true
    }
})
const formZize = ref('default')
const referenceForm = ref()
const dataForm = reactive({
    name: '',
    address: '',
    city_id: '',

})

const rules =reactive({
    name:[
        {required: true, message: 'Ingrese el nombre del barrio ', trigger: 'blur'}
    ],
    address: [
        {required: true, message: 'Ingrese la direccion', trigger: 'blur'},

],
    city: [
        {required: true, message: 'Seleccione una ciudad', trigger: 'blur'}
    ]
}) 

const runRules = async (reference) =>{
    if(!reference) return false
    return new Promise ((resolve)=>{
        reference.validate((valid)=>{
            if(valid){
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })

}
</script>
<style scoped>
  
.el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);

}
</style>
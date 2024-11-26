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
                <el-form-item label="Nombre del departemento" prop="name">
                    <el-input v-model="dataForm.name"/>
                </el-form-item>
                <el-form-item label="Codigo" prop="code">
                    <el-input v-model="dataForm.code"/>
                </el-form-item>
                <el-form-item label="Pais" prop="country">
                    <el-select v-model="dataForm.country_id" placeholder="Activity zone">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                </el-form>
                <el-button type="success" @click="runRules(referenceForm)">Ejecutar</el-button>
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
    code: '',
    country_id: '',

})

const rules =reactive({
    name:[
        {required: true, message: 'Ingrese el nombre del departamento', trigger: 'blur'}
    ],
    code: [
        {required: true, message: 'Ingrese el codigo del departamento', trigger: 'blur'},
        {min :5 , max: 5, message: 'Tiene que ser 5 digitos', trigger: 'blur'},
        {
            validator: (rule, value, callback)=>{
                
                if(isNaN(dataForm.code)){
                    callback(new Error ('El codigo debe tener numeros'))
                }else{
                callback()
            }
            }
            
        }
    ],
    country: [
        {required: true, message: 'Seleccione un pais', trigger: 'blur'}
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
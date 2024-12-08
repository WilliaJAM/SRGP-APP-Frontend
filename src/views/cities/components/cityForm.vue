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
                <el-form-item label="Nombre de la ciudad" prop="name">
                    <el-input v-model="dataForm.name"/>
                </el-form-item>
                <el-form-item label="Codigo" prop="code">
                    <el-input v-model="dataForm.code"/>
                </el-form-item>
                <el-form-item label="Departemento" prop="department">
                    <el-select v-model="dataForm.department_id" placeholder="Seleccione una ciudad perteneciente al departamento">
                        <el-option v-for="items in props.array" 
                        :key="items.id"
                        :label="items.name"
                        :value="items.id"
                        />
                    </el-select>
                </el-form-item>
                </el-form>
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
    department_id: '',

})

const rules =reactive({
    name:[
        {required: true, message: 'Ingrese el nombre de la ciudad', trigger: 'blur'}
    ],
    code: [
        {required: true, message: 'Ingrese el codigo de la ciudad', trigger: 'blur'},
        {min :5 , max: 5, message: 'Tiene que ser 5 digitos', trigger: 'blur'},
        {
            validator: (rule, value, callback)=>{
                
                if(isNaN(dataForm.code)){
                    callback(new Error ('No se permiten letras como id'))
                }else{
                callback()
            }
            }
            
        }
    ],
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

const clearForm = async ()=>{
    referenceForm.value.resetFields()
}

defineExpose({
    clearForm,
    runRules,
    dataForm,
    referenceForm
})
</script>
<style scoped>
  
.el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);

}
</style>
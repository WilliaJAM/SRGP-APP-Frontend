<template>
    <el-card style="max-width: 100%; width: 90%;">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form
    ref="formRef"
    style="max-width: 90%"
    :model="dataForm" 
    :rules="rulesValidation"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Nombre de la categoria" prop="name">
      <el-input placeholder="Ingrese nombre del rol" v-model="dataForm.name" />
    </el-form-item> 
  </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
    dataValue: Object
})

const formRef= ref()
const formSize = ref('default')
const dataForm = reactive({ 
    name: ''
})


const putDataInForm = ()=>{
    dataForm.name = props.dataValue[0].name
}


const rulesValidation = reactive({ 
    name:[
        {required: true, message: 'Ingresa un nombre de la categoria', trigger: 'blur'},
        {min: 3, max: 999, message: 'El nombre debe ser minimo de 5 caracteres', trigger: 'blur'} 
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

const clearFileds = async ()=>{
    formRef.value.resetFields()
}

watch(
    ()=>props.dataValue,
    (newData)=>{
        putDataInForm()
    }
)

defineExpose({clearFileds, runRules, dataForm,formRef })
</script>

<style scoped>
.el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);

}
</style>
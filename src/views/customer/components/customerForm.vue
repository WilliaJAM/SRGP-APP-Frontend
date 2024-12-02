<template>
    <el-card style="max-width: 100%; width: 600px;">
          <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="dataForm" 
      :rules="rulesValidation"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Nombre del Rol" prop="name">
        <el-input placeholder="Ingrese nombre del cliente" v-model="dataForm.name" />
      </el-form-item> 
      <el-form-item label="Tipo de documento" prop="name">
        <el-input placeholder="Ingrese nombre del rol" v-model="dataForm.documentType" />
      </el-form-item> 
      <el-form-item label="Numero de documento" prop="name">
        <el-input placeholder="Ingrese nombre del rol" v-model="dataForm.identificationNumber" />
      </el-form-item> 
      <el-form-item label="Numero telefonico" prop="name">
        <el-input placeholder="Ingrese nombre del rol" v-model="dataForm.phone" />
      </el-form-item> 
    </el-form>
              </el-col>
          </el-row>
      </el-card>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  
  
  const formSize = ref('large')
  const formRef = ref()
  const dataForm = reactive({
    name: '',
    documentType : '',
    identificationNumber: '',
    phone_id: '',
    address_id: '',
    email: ''
    
  }) 
  
  
  
  const rulesValidation = reactive({
    name: [
      { required: true, message: 'Ingrese un nombre', trigger: 'blur' },
      { min: 5, max: 30, message: 'El nombre debe superar el maximo entre 5 a 30 letras', trigger: 'blur' },
    ],
    
  })
  
  const validateData = ()=> {
  
  }
  
  const validateForm = async (formularyRef) => {
    if (!formularyRef) return false
    return new Promise ((resolve) =>{ 
      formularyRef.validate((valid) => {
      if (valid) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    })
  }
  
  const clearFormInputs= () =>{
    formRef.value.resetFields()
  }
  
  
  
  defineExpose({dataForm, formRef,validateForm, clearFormInputs});
  </script>
  
  <style scoped>
  
  .el-button{
    margin-top: 15px;
    transform: translate(100px );
  }
  
  
  
  
  </style>
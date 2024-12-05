<template>
    <el-card style="max-width: 100%">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form
      ref="formRef"
      style="max-width: 90%"
      :model="dataForm" 
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Nombre del cliente" prop="name">
        <el-input placeholder="Ingrese nombre del cliente completo" v-model="dataForm.name" />
      </el-form-item> 
      <el-form-item label="Tipo de documento" prop="type_docment">
        <el-select v-model="dataForm.type_docment" placeholder="Seleccione el tipo">
          <el-option v-for="item in typesDocument"
          :key="item.id"
          :label="item.name"
          :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Numero de documento" prop="identificationNumber">
        <el-input placeholder="Ingrese numero de documento" v-model="dataForm.identificationNumber"/>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="dataForm.email" placeholder="Ingrese correo electronico"/>
      </el-form-item>
      <el-form-item label="Numero telefonico" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="Ingrese nuemro de telefono"/>
    </el-form-item>
    <el-form-item label="Seleccione tipo telefonico" prop="phone">
      <el-select  v-model="dataForm.type_phone" placeholder="Selecciona un tipo">
        <el-option v-for="item in typePhone" 
        :key="item.id"
        :name="item.name"
        :value="item.name"
        />
        
      </el-select>
    </el-form-item>
    <el-form-item label="Seleccione Ciudad" prop="city_id">
      <el-select  v-model="dataForm.city_id" placeholder="Selecciona una ciudad">
        <el-option v-for="item in props.city" 
        :key="item.id"
        :label="item.name"
        :value="item.id"
        />
        
      </el-select>
    </el-form-item>
    <el-form-item label="Barrio" prop="neighborhood_name">
      <el-input v-model="dataForm.neighborhood_name" placeholder="Escriba nombre del barrio"/>
    </el-form-item>
    <el-form-item label="Dirección" prop="address">
      <el-input v-model="dataForm.address" placeholder="Escriba la direccion del cliente"/>
    </el-form-item>
    <el-form-item label="Rol" prop="rol_id">
      <el-select v-model="dataForm.rol_id" placeholder="Seleccione un rol">
        <el-option v-for="item in props.rol" 
        :key="item.id"
        :label="item.name"
        :value="item.id"
        />
      </el-select>
    </el-form-item>
    </el-form>
            </el-col>
        </el-row>
    </el-card>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  
  
  const props= defineProps({
    rol: {
      type: Array,
      required: true
    },
    city: {
      type: Array,
      required: true
    }
  })

  const formSize = ref('large')
  const formRef = ref()
  const dataForm = reactive({
    name: '',
    email: '',
    type_docment: '',
    identificationNumber: '',
    phone: '',
    type_phone: '',
    city_id: '',
    address: '',
    neighborhood_name: '',
    rol_id: ''
    
  }) 
  const typePhone = [
    {id: 1, name: 'Personal',},
    {id: 2, name: 'Empresarial',},
  ]
  
  const typesDocument = [
    {id: 1, name: 'Tarjeta de identidad', value:'Tarjeta de identidad'},
    {id: 2, name: 'Cedula de ciudadania', value:'Cedula de ciudadania'},
    {id: 3, name: 'Cedula de extranjeria', value:'Cedula de extranjeria'},
  ]

  const rulesValidation = reactive({
    name: [
      { required: true, message: 'Ingrese un nombre', trigger: 'blur' },
      { min: 5, max: 30, message: 'El nombre debe superar el maximo entre 5 a 30 letras', trigger: 'blur' },
    ],
    
  })
  
  const rules = reactive({
    name: [
      {required: true, message: 'Ingrese nombre', trigger: 'blur'},
    ],
    email: [
      {type: 'email', message: 'Ingrese un correo valido', trigger: 'blur'},
      {required: true, message: 'Ingrese un correo', trigger: 'blur'}
    ],
    type_docment:[
      {required: true, message: 'Seleccione un tipo de documento'}
    ],
    identificationNumber: [
      {required: true, message: 'Ingrese numero de identificación', trigger: 'blur'},
      {
        validator:(value, rules, callback)=>{
          if(isNaN(dataForm.identificationNumber)){
            callback(new Error ('Solo se permiten caracteres numericos'))
          }else{
            callback()
          }
        }
      }
    ],
    phone: [
      {required: true, message: 'Ingrese numero telefonico', trigger: 'blur'},
      {
        validator:(value, rules, callback)=>{
          if (isNaN(dataForm.phone)) {
            callback(new Error('Solo se permiten caracteres numericos'))
          }else{
            callback()
          }
        }
      },
      {min :10, max: 10, message: 'Los nuemro telefonicos no superan los 10 digitos', trigger: 'blur'}
    ],
    type_phone: [
      {required: true, message: 'Selecciona un tipo de telefono', trigger: 'blur'}
    ],
    city_id: [
    {required: true, message: 'Selecciona una ciudad', trigger: 'blur'}
    ],
    address: [
      {required: true, message: 'Escribe una direccion', trigger: 'blur'}
    ],
    neighborhood_name:[
    {required: true, message: 'Escribe un nombre', trigger: 'blur'}
    ],
    rol_id: [
    {required: true, message: 'Selecciona un rol', trigger: 'blur'}
      
    ]
  })
  

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
  .el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);
}
  </style>
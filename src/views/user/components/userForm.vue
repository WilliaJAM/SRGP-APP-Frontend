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
                <el-form-item label="Nombre del usuario" prop="name">
                    <el-input v-model="dataForm.name" placeholder="Primer y segundo nombre"/>
                </el-form-item>
                <el-form-item label="Apellidos nombre del usuario" prop="lastName">
                    <el-input v-model="dataForm.last_name" placeholder="Primer y segundo apellido"/>
                </el-form-item>
                <el-form-item label="Ingrese foto del usuario" prop="image">
                    <el-input v-model="dataForm.image"/>
                </el-form-item>
                <el-form-item label="Ingrese numero de identificación" prop="identificationNumber">
                    <el-input v-model="dataForm.cedula" placeholder="El formato ej: 1079408646"/>
                </el-form-item>
                <el-form-item label="Ingrese contraseña" prop="password">
                    <el-input placeholder="Crea una contraseña para el usuario" type="password" v-model="dataForm.password"/>
                </el-form-item>
                <el-form-item label="Fecha de nacimiento" prop="birthdate">
                <el-date-picker
                type="date" 
                v-model="dataForm.birthdate"
                aria-label="Escoge una fecha"
                placeholder="Escoge una fecha"
                style="width: 100%;"
                />
                </el-form-item>
                <el-form-item label="Fecha de registro" prop="registration">
                <el-date-picker
                v-model="dataForm.registration_date"
                type="date"
                aria-label="Escoge una fecha"
                placeholder="Escoge la fecha en que se registrara el usuario"
                style="width: 100%;"
                />
                </el-form-item>
                <el-form-item label="Estado de la cuenta" prop="statusAccount">
                    <el-select v-model="dataForm.account_status" placeholder="Seleccione un estado (inicialmente debe estar activo)">
                        <el-option label="Activo" value="activo" />
                        <el-option label="Inactivo" value="inactivo" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Ingrese Email" prop="email">
                    <el-input v-model="dataForm.email"/>
                </el-form-item>
                <el-form-item label="Ingrese id" prop="id">
                    <el-input placeholder="Ingrese un id ej: 001 y si ya exite 002, asi sucesivamente" v-model="dataForm.email"/>
                </el-form-item>
                <el-form-item label="Selecciona un rol" prop="rol">
                    <el-select v-model="dataForm.rol_id" placeholder="Rol para el usuario">
                        <el-option label="Activo" value="activo" />
                        <el-option label="Inactivo" value="inactivo" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Selecciona el tipo de telefono" prop="typePhone">
                    <el-select v-model="dataForm.phone_id" placeholder="Especifique el tipo de telefono">
                        <el-option label="Personal" value="personal" />
                        <el-option label="Empresarial" value="empresarial" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Seleciona pais" prop="countryPhone">
                    <el-select v-model="dataForm.phone_id" placeholder="Seleccione el pais perteneciente al telefono">
                        <el-option label="Personal" value="personal" />
                        <el-option label="Empresarial" value="empresarial" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Ingrese numero telefonico" prop="numberPhone">
                    <el-input v-model="dataForm.phone" placeholder="Numero telefonico de la persona"/>
                </el-form-item>
                <el-form-item label="Ingrese nombre del barrio" prop="neighborhoodName">
                    <el-input v-model="dataForm.phone" placeholder="Nombre del barrio"/>
                </el-form-item>
                <el-form-item label="Ingrese direccion" prop="address">
                    <el-input v-model="dataForm.phone" placeholder="Direccion de la residencia"/>
                </el-form-item>
                <el-form-item label="Selecciona la ciudad" prop="city">
                    <el-select v-model="dataForm.phone_id" placeholder="Seleccione la ciudad perteneciente al usuario">
                        <el-option label="Personal" value="personal" />
                        <el-option label="Empresarial" value="empresarial" />
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
        required: true,
      },
      dataValue: Object
  })
  const formZize = ref('default')
  const referenceForm = ref()
  const dataForm = reactive({
    name: '',
    last_name: '',
    image: '',
    cedula: '',
    birthdate:'',
    password: '',
    gender: '',
    registration_date: '',
    last_date_of_entry: '',
    account_status: '',
    email: '',
    user_id: '',
    rol_id: '',
    typePhone: '',
    countryPhone:'',
    numberPhone:'',
    neighborhoodName: '',
    address:'',
    city:''
  })

  const rules =reactive({
    name:[
        {required: true, message: 'Ingrese el nombre del usuario ', trigger: 'blur'}
    ],
    lastName:[
    {required: true, message: 'Ingrese el nombre del usuario ', trigger: 'blur'}
    ],
    image: [
        {required:true, message: 'Ingrese imagen', trigger: 'blur'}
    ],
    identificationNumber: [
        {
            validator:(value, rules, callback)=>{
                if(isNaN(dataForm.cedula)){
                    callback(new Error('Solo debe contener numeros'))
                }else{
                    callback()
                }
            }
        },
        {required:true, message: 'Ingrese numero de identificación', trigger: 'blur'}
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
  </script>
  <style scoped>
  
  .el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);
  
  }
  </style>
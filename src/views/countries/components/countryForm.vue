<template>
    <el-card style="max-width: 100%">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form
    ref="refForm"
    style="max-width: 90%"
    :model="dataForm"
    :rules="rulesForm"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Nombre del pais" prop="name">
      <el-input v-model="dataForm.name" />
    </el-form-item>
    <el-form-item label="Codigo" prop="code">
      <el-input v-model="dataForm.code" />
    </el-form-item>
    <el-form-item label="Codigo de tres letras" prop="threeLetterCode">
      <el-input  v-model="dataForm.threeLetterCode"/>
    </el-form-item>
    <el-form-item label="Moneda" prop="currency">
      <el-input @input="toUpperCase" v-model="dataForm.currency"/>
    </el-form-item>
    <el-form-item label="Prefijo Telefonico" prop="telephonePrefix">
      <el-input  v-model="dataForm.telephonePrefix"/>
    </el-form-item>
  </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue';


const props = defineProps({
  array:{
    type:Array,
    required: true,
    dataValue: Object
  }
})
const formSize = ref('large')
const refForm = ref()
const dataForm = reactive({
  name: '',
  code: '',
  threeLetterCode: '', 
  currency: '',
  telephonePrefix: '', 
})



const rulesForm = reactive({
  name: [
    { required: true, message: 'Por favor ingrese un nombre', trigger: 'blur' },
    { min: 5, max: 20, message: 'Ingrese nombre maximo 3 minomo 5', trigger: 'blur' },
  ],
  code: [
    {required: true, message: 'Porfavor llene este campo', trigger: 'blur'},
    {min: 3, max : 3, message: 'Ingrese un codigo de 3 caracteres', trigger: 'blur' }
  ],
  threeLetterCode: [
    {required: true, message: 'Ingrese el codigo de 3 letras', trigger: 'blur'},
    {min: 3 ,max: 3, messasge: 'No debe pasarse de 3 letras', trigger: 'blur'},
    {

      validator: (rule, value, callback) =>{
        // Se evalua con su version mauyusculas si noes asi ejecuta el callback error
        if(dataForm.threeLetterCode === dataForm.threeLetterCode.toUpperCase()){
          callback()
        }else{
          callback(new Error('El codigo de tres letras debe estar en mayusculas'))
        }
      }, 
      trigger: 'blur'
    }
  ],
  currency: [
    {required: true, message: 'Ingrese moneda local', trigger: 'blur'},
    {min: 3 , max: 3, message: 'La moneda no tiene mas de 3 caracteres', trigger: 'blur'},
    {
      validator: (rule, value, callback) =>{

        const transform = String(dataForm.currency);
        
        //de vuelve true ya que al ser estring no es un numero (Not a Number)
        //el isNaN es una función que verifica si un valor es "Not a Number"
        if(isNaN(transform)){
          callback()
        }else{
          callback(new Error('Solo se admiten letras (ej: COP)'));
        }
      },
      trigger: 'blur'
    },
    {

      validator: (rule, value, callback) =>{
        if(dataForm.currency === dataForm.currency.toUpperCase()){
          callback()
        }else{
          callback(new Error('La moneda local tiene que ser mayuscula'))
        }
      }, 
      trigger: 'blur'
    }
  ],
  telephonePrefix: [
  {required: true, message: 'Ingrese prefijo telefonico', trigger: 'blur'},
  {min: 2, max: 4, message: 'El rango de caracteres es minimo 2 y maximo 4',},
  {//valida si el dato ingresado contiene el +
    validator: (rule, value, callback) => {
    if (dataForm.telephonePrefix.startsWith('+')) {
      callback(); 
    } else {
      callback(new Error("El formato de prefijo es +XXX (ej: +57 es colombia)"))
    }
  },
  trigger: "blur" 
  },
  {//valida si el dato contiene numeros (el validator tiene que estar rule y value aunque no se esten usando)
    validator: (rule, value,callback) =>{
      const validatioNumber= dataForm.telephonePrefix.substring(1, 3)
      const transform = Number(validatioNumber);

      if(isNaN(transform)){
        callback(new Error("Debe contener numero no letras"))
      }else{
        callback();
      }
    },
    trigger: 'blur'
  }
  ]
})



const runRules = async (ref) => {
  if (!ref) return false
    return new Promise((resolve) => {
    ref.validate((valid)=>{
    if (valid) {
      resolve(true)
    } else {
      resolve(false)

    }
})
})
}

const resetForm = () => {
  refForm.value.resetFields()
}

defineExpose({dataForm, refForm ,resetForm, runRules})
</script>
<style scoped>
  
.el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);

}
</style>
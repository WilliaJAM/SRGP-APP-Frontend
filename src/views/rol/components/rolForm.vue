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
      <el-input placeholder="Ingrese nombre del rol" v-model="dataForm.name" />
    </el-form-item> 
  </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'


const formSize = ref('large')//tamaño del formulario
const formRef = ref() //variable que almacena todas la variables del form
const dataForm = reactive({
  name: '',
  
}) //almacena el valor ingresado y se guardar en el :model 



const rulesValidation = reactive({
  name: [
    { required: true, message: 'Ingrese un nombre', trigger: 'blur' },
    { min: 5, max: 30, message: 'El nombre debe superar el maximo entre 5 a 30 letras', trigger: 'blur' },
  ],
  
})

//funcion que se enlazara con lo botones del formulario para realizar las rules
const validateData = ()=> {

}

//explicar esta funcion y el promise
const validateForm = async (formularyRef) => {
  if (!formularyRef) return false //devuelve false si el formalario o algo falla entonces no la valida si no que retorna de una vez a false
  return new Promise ((resolve) =>{ //importante el return de la promise para que devuelva el valor booleano.
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
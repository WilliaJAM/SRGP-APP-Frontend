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
              <el-form-item label="Nombre del producto" prop="name">
                  <el-input v-model="dataForm.name"/>
              </el-form-item>
              <el-form-item label="Cantidad en Stock" prop="cuantityInStock">
                  <el-input type="number" v-model="dataForm.cuantityInStock"/>
              </el-form-item>
              <el-form-item label="Fecha de salida" prop="departureDate">
                <el-date-picker
                type="date" 
                v-model="dataForm.departureDate"
                aria-label="Escoge una fecha"
                placeholder="Escoge una fecha"
                style="width: 100%;"
                />
              </el-form-item>
              <el-form-item label="Fecha de entrada" prop="dateOfEntry">
                <el-date-picker
                v-model="dataForm.dateOfEntry"
                type="date"
                aria-label="Escoge una fecha"
                placeholder="Escoge una fecha"
                style="width: 100%;"
                />
              </el-form-item>
              <el-form-item label="Proveedor" prop="city">
                  <el-select v-model="dataForm.supplier_id" placeholder="Selecciona un proveedor ">
                      <el-option v-for="item in props.array"
                      :key="item.id"
                      :label="item.supplier_name"
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
import { reactive, ref, watch } from 'vue';

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
  cuantityInStock: '',
  departureDate: '',
  dateOfEntry: '',
  supplier_id: ''

})

const inputDataForm = ()=>{
  dataForm.name = props.dataValue[0].name
  dataForm.cuantityInStock = props.dataValue[0].quantity_in_stock
  dataForm.departureDate = props.dataValue[0].departure_date
  dataForm.dateOfEntry = props.dataValue[0].date_of_entry
  dataForm.supplier_id = props.dataValue[0].supplier_id
}

const rules =reactive({
  name:[
      {required: true, message: 'Ingrese el nombre del barrio ', trigger: 'blur'}
  ],
  cuantityInStock: [
      {required: true, message: 'Ingrese la cantidad', trigger: 'blur'},

],
  departureDate: [
      {required: true, message: 'Seleccione la fecha de salida', trigger: 'blur'}
  ],
  dateOfEntry: [
  {required:true, message: 'Seleccione una fecha'}
  ],
  supplier_id: [
    {required:true, message: 'Seleccione el proveedor', trigger: 'change'}
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

const clearForm = async ()=>{
  referenceForm.value.resetFields()
}

watch(
  ()=> props.dataValue,
  (newData)=>{
    inputDataForm()
  }
)

defineExpose({referenceForm,dataForm, runRules, clearForm})
</script>
<style scoped>

.el-form-item{
margin-bottom: 30px;
transform: translate(50px);

}
</style>
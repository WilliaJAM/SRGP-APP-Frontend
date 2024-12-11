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
                <el-form-item label="Nombre del proveedor" prop="supplier_name">
                    <el-input v-model="dataForm.supplier_name"/>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="dataForm.email"/>
                </el-form-item>
                <el-form-item label="Numero telefonico" prop="phone">
                    <el-input v-model="dataForm.phone" placeholder="Ingrese numerico telefonico"/>
                </el-form-item>
                <el-form-item label="Tipo de telefono" prop="type_phone">
                    <el-select v-model="dataForm.type_phone" placeholder="Selecciona un tipo">
                        <el-option v-for="item in typePhone"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                        />
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="Ciudad" prop="city_id">
                <el-select v-model="dataForm.city_id" placeholder="Selecciona una ciudad">
                <el-option v-for="item in props.array"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                />
                </el-select>
                </el-form-item>
                <el-form-item label="Dirreción" prop="address">
                    <el-input v-model="dataForm.address" placeholder="Ingrese una direccion"/>
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
        required: true
    },
    dataValue: Object
})
const formZize = ref('default')
const referenceForm = ref()
const dataForm = reactive({
    supplier_name: '',
    email: '',
    phone: '',
    type_phone: '',
    address: '',
    city_id: ''

})

const inputDataForm = ()=>{
    dataForm.supplier_name= props.dataValue[0].supplier_name
    dataForm.email= props.dataValue[0].email
    dataForm.phone= props.dataValue[0].phone
    dataForm.type_phone= props.dataValue[0].type_phone
    dataForm.address= props.dataValue[0].address
    dataForm.city_id= props.dataValue[0].city_id
}

const typePhone = [
    {id: 1 , label: 'Personal',value:'Personal'},
    {id: 2 , label: 'Empresarial',value:'Empresarial'}
]

const rules =reactive({
    supplier_name:[
        {required: true, message: 'Ingrese el nombre del barrio ', trigger: 'blur'}
    ],
    address: [
        {required: true, message: 'Ingrese la direccion', trigger: 'change'},
    ],
    email: [
        {type: 'email', message: 'Ingrese un correo electonico valido', trigger: 'blur'},
    ],
    type_phone:[
        {required: true, message: 'Selecione un tipo', trigger: 'change'}
    ],
    phone: [
        {required: true, message: 'Ingrese un numero telefonico', trigger: 'change'},
        {min: 10 , max: 10 , message: 'Debe contener 10 digitos', trigger: 'blur'}
    ],
    city_id:[
        {required: true, message: 'Selecciona una ciudad', trigger: 'blur'}
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

const clearForm = async()=>{
    referenceForm.value.resetFields()
}

watch(
    ()=> props.dataValue,
    (newData)=>{
        inputDataForm()
    }
)

defineExpose({clearForm, runRules,dataForm,referenceForm })
</script>
<style scoped>
  
.el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);

}
</style>
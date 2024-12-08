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
                <el-form-item label="Inventario" prop="inventory_id">
                    <el-select v-model="dataForm.inventory_id" placeholder="Seleccione el material del inventario">
                        <el-option v-for="item in props.inventory"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Categoria" prop="category_id">
                    <el-select v-model="dataForm.category_id" placeholder="Seleccione la categoria">
                        <el-option v-for="item in props.category"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Imagen" prop="image">
                    <el-input v-model="dataForm.image"/>
                </el-form-item>
                <el-form-item label="Precio del producto" prop="price">
                    <el-input v-model="dataForm.price" 
                    :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"/>
                </el-form-item>
                <el-form-item label="Descripción" prop="description">
                    <el-input type="textarea" autosize placeholder="Escriba una breve descripción" v-model="dataForm.description"/>
                </el-form-item>
                <el-form-item label="Dimensiones" prop="dimensions">
                    <el-input  v-model="dataForm.dimensions"/>
                </el-form-item>
                <el-form-item label="Estado" prop="status">
                    <el-select v-model="dataForm.status" placeholder="Seleccione el estado">
                        <el-option v-for="item in disponibility"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Id del producto" prop="id_product">
                    <el-input  v-model="dataForm.id_product"/>
                </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
    inventory: {
        type: Array,
        required: true
    },
    category: {
        type: Array,
        required: true
    }
})
const formZize = ref('default')
const referenceForm = ref()
const dataForm = reactive({
    price: '',
    image: '',
    description: '',
    dimensions: '',
    status: '',
    id_product: '',
    category_id: '',
    inventory_id: '' 

})

const disponibility = [
    {id:1 ,name: 'Disponible', value: true},
    {id:2 ,name: 'No disponible', value: false}
]

const rules =reactive({
    price: [
        {required: true, message: 'Ingrese valor', trigger: 'blur'},
        {
            validator:(value, rules, callback)=>{

                if(isNaN(dataForm.price)){
                    callback(new Error('No se admiten letras'))
                }else{
                    callback()
                }

            },
            trigger: 'blur'
        }
    ],
    image: [
        {required: true, message: 'Ingrese imagen', trigger: 'blur'}
    ],
    description: [
        {required: true, message: 'Ingrese una descripción del producto', trigger: 'blur'},
        {min: 10, max: 999, message: 'La descripción es demasiado corta', trigger: 'blur'}
    ],
    dimensions: [
        {required: true, message: 'Ingrese dimensiones del producto ej: 2cm x 1cm', trigger: 'blur'}
    ],
    status: [
        {required: true, message: 'Por favor seleccionar un estado', trigger: 'blur'}
    ],
    id_product: [
        {required: true, message: 'Ingrese un id ej: 00001, 00002', trigger: 'blur' },
        {min: 5 , max: 5, message: 'Ingrese un id de 5 digitos', trigger: 'blur'},
        {
            validator:(value, rules, callback)=>{
                if(isNaN(dataForm.id_product)){
                    callback(new Error('No se permiten letras como id'))
                }else{
                    callback()
                }
            }
        }
    ],
    category_id: [
        {required: true, message: 'Por favor seleccionar una categoria', trigger: 'blur'}
    ],
    inventory_id: [
        {required: true, message: 'Por favor seleccionar un item del invetario', trigger: 'blur'}
        
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

defineExpose({clearForm, runRules, dataForm, referenceForm})
</script>
<style scoped>
  
.el-form-item{
  margin-bottom: 30px;
  transform: translate(50px);

}
</style>
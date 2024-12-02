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
                <el-form-item label="Inventario" prop="inventory">
                    <el-select v-model="dataForm.inventory_id" placeholder="Seleccione el material del inventario">
                        <el-option label="Disponible" value="shanghai" />
                        <el-option label="No disponible" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Categoria" prop="category">
                    <el-select v-model="dataForm.category_id" placeholder="Seleccione la categoria">
                        <el-option label="Disponible" value="shanghai" />
                        <el-option label="No disponible" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Precio del producto" prop="price">
                    <el-input v-model="dataForm.price"/>
                </el-form-item>
                <el-form-item label="Imagen" prop="image">
                    <el-input v-model="dataForm.image"/>
                </el-form-item>
                <el-form-item label="Descripción" prop="description">
                    <el-input type="textarea" autosize placeholder="Escriba una breve descripción" v-model="dataForm.description"/>
                </el-form-item>
                <el-form-item label="Dimensiones" prop="dimensions">
                    <el-input  v-model="dataForm.dimensions"/>
                </el-form-item>
                <el-form-item label="Estado" prop="status">
                    <el-select v-model="dataForm.status" placeholder="Seleccione el estado">
                        <el-option label="Disponible" value="shanghai" />
                        <el-option label="No disponible" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Id del producto" prop="id_product">
                    <el-input  v-model="dataForm.id_product"/>
                </el-form-item>
                </el-form>
                <el-button type="success" @click="runRules(referenceForm)">Ejecutar reglas</el-button>
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
    price: '',
    image: '',
    description: '',
    dimensions: '',
    status: '',
    id_product: '',
    category_id: '',
    inventory_id: '' 

})

const rules =reactive({
    
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
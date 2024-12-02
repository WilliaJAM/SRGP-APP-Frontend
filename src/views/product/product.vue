<template>
    <LayoutMain>
        <template #slotUno>
            <Header
            :title="'Productos'"
            :titleButton="'Nuevo producto'"
            :open="showForm"
            v-show="hideContent"
            />

            <Forms
            v-model:is-open="openForm"
            v-model:is-close="hideContent"
            :isEdit="isEdit"
            :titleForm="'Producto'"
            >
                <template #slotForm>
                    <productForm/>
                </template>                
            </Forms>
            
            <div v-show="hideContent">
                <el-card style="max-width: 250px;"shadow="hover">
                <template #header>Nombre del producto</template>
            <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
            />
            <p>Id del producto: 1</p>
            <p>Dimenciones: 2 pulgadas por 1 pulgada</p>
            <p>Descripción: Lorem ipsum, dolor sit amet consectetur adipisintur magni nostrum velit beatae! Nam, nesciunt.</p>
            <p>Estado: Activo</p>
            <p>Categoria: Perfil</p>
            <p>Inventario:</p>
                <el-button link type="primary" size="default"  :icon="Edit" @click="editTbale"> Editar</el-button>
                <el-button link type="danger" :icon="Delete"  size="default"> Borrar</el-button>
            <template #footer>Precio: $34.000</template>
            </el-card>
            </div>
        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import productForm from './components/productForm.vue'
import Forms from '../../components/Forms.vue';
import {
Edit,
Delete

} from '@element-plus/icons-vue'
import { ref } from 'vue';


const openForm= ref(false)
const hideContent= ref(true)
const isEdit= ref(null)

const showForm = async () =>{
    openForm.value =true 
    hideContent.value = false
    isEdit.value = false
}

const editTbale = async () =>{
    showForm()
    isEdit.value = true
}

</script>

<style scoped>

</style>
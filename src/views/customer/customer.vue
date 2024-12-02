<template>
    <LayoutMain>
        <template #slotUno>
            
            <Header
            :title ="'Clientes'"
            :titleButton = "'Nuevo cliente'"
            :open="openForm"
            v-show="hideContent"
            />

            <Forms
            v-model:is-open="showForm"
            v-model:is-close="hideContent"
            :isEdit = "isEdit"
            :titleForm="'Clientes'"
            >
                <template #slotForm>
                    <customerForm/>
                </template>
            </Forms>


        </template>
    </LayoutMain>
</template>
<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import Forms from '../../components/Forms.vue';
import customerForm from './components/customerForm.vue'
import { ref } from 'vue';


const showForm = ref(false)
const hideContent = ref(true)
const isEdit = ref(null)


const openForm = async () =>{
    showForm.value = true
hideContent.value =  false
isEdit.value = false

}

const editTable = async () =>{
    openForm()
isEdit.value = true

}


</script>

<style scoped>

</style>
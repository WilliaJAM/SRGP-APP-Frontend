<template>
     <div class="container" v-show="isVisible" >
        <h2>Formulario de {{ titleForm }}</h2>

        <slot name="slotForm">
    
        </slot>
        <div class="buttonForm">
            <el-button type="primary">Cancelar</el-button>
            <el-button type="primary">Guardar</el-button>

        </div>

        

    </div>

</template>

<script setup>
import {ref} from 'vue'


defineProps({
    titleForm: String,
    isVisible: Boolean
})

const isVisible = ref(true);




</script>


<style scoped>

.buttonForm{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
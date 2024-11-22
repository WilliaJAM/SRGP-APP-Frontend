<template>
    <div class="form-container" v-show="isVisible">
        <div class="headerSection">
            
            <h2>Formulario de {{ props.titleForm }}</h2>
            <div class="buttonForm">
                <el-row justify="center" align="middle">
                    <el-button type="danger" @click="goBack">Cancelar</el-button>
                    <el-button type="success" @click="submit" >{{textButton}}</el-button>
        </el-row>
                
            </div>
        </div>

        <el-main>
            <slot name="slotForm">
        </slot>
        </el-main>
        

    </div>

</template>

<script setup>
import { computed, ref } from 'vue'


const props = defineProps({
    titleForm: String,
    isOpen: Boolean,
    isClose: Boolean,
    isEdit: Boolean
})
//recibe la varible del componente, ademas es reactiva.
const isVisible = computed(() =>props.isOpen);


const $emit = defineEmits(['update:is-open', 'update:is-close', 'save', 'update']);

const goBack = () => {
    $emit('update:is-open', false);
    $emit('update:is-close', true);
}
//variable del texto del boton
const textButton = computed(() =>props.isEdit ? 'Actualizar' : 'Guardar');



const submit =()=>{
    if(props.isEdit){
        $emit('update');
    }else{
        $emit('save');
    }
}


</script>


<style scoped>

.headerSection{
    display: flex;
    justify-content: space-between;
}


</style>
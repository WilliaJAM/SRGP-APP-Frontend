<template>

    <div class="container">
        <h2>{{ dynamicTitle }}</h2>
        <slot id="slot" name="slotButton">
        </slot>
    </div>
</template>

<script setup>

defineProps({
    dynamicTitle: String
})

</script>

<style scoped>
.container{
    display: flex;
    justify-content: space-between;
    
}

</style>
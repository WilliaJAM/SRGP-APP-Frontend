<template>
    <div class="container">
        <h2>{{ dynamicTitle }}</h2>
    </div>
</template>

<script setup>

defineProps({
    dynamicTitle: String
})

</script>

<style scoped>


</style>
<template>
    <LayoutMain>
        <template #slotUno>
            <DynamicTitle
            :dynamicTitle="'Detalles de las ventas'"
            />
        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import DynamicTitle from '../../components/DynamicTitle.vue';
</script>

<style scoped>

</style>
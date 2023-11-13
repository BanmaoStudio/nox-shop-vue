<script setup>
import { zhCN, dateZhCN } from 'naive-ui';
    const themeOverrides = {
        // common: {
        //     primaryColor: '#6466f1',
        // },
        // Button: {
        //     colorPressedPrimary: '#8688F3FF',
        //     colorHoverPrimary: '#8688F3FF'
        // },
        // Tag: {
        //     colorCheckedHover: '#8688f3FF',
        //     colorCheckedPressed: '#8688F3FF',
        // },
    }
</script>

<template>
    <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
        <naive-provider>
            <router-view />
        </naive-provider>
    </n-config-provider>
</template>

<style scoped></style>

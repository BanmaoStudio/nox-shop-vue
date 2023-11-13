<template>
    <Icon :icon="props.icon" v-bind="bindAttrs" />
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
    icon: {
        type: String
    }
})

const attrs = useAttrs()

const bindAttrs = computed(() => ({
    class: (attrs.class) || '',
    style: (attrs.style) || ''
}))


</script>

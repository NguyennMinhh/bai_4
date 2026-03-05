<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update-opacity', 'toggle-layer'])

const props = defineProps({
    opacity: { type: Number, required: true },
    isVisible: { type: Boolean, required: true}
})
const localVisible = ref(props.isVisible)
const localOpacity = ref(props.opacity)

watch(localVisible, (newValue) => { emit('toggle-layer', newValue) })
watch(localOpacity, (newValue) => { emit('update-opacity', newValue) })

</script>

<template>
    <div>
        <div>
            <label>Opacity: {{ localOpacity }}</label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                v-model.number="localOpacity"
            />
        </div>
        <div>
            <input
                type="checkbox"
                v-model="localVisible"
            />
            <label>Toggle Layer</label>
        </div>
    </div>
</template>

<style scoped>
</style>
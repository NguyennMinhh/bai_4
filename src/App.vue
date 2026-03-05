<script setup>
import { ref, computed } from 'vue'

import LayerControl from './components/LayerControl.vue'

const geoserverUrl = ref('http://localhost:8080/geoserver/bai_4/wms')
const layerName = ref('bai_4:NenDC')
const opacity = ref(1)
const isVisible = ref(true)

const isTransparentMode = computed(() => opacity.value < 1)

const handleUpdateOpacity = (newValue) => {
    opacity.value = Number(newValue)
}

const handleUpdateVisible = (newBoolean) => {
    isVisible.value = newBoolean
}

</script>

<template>
<div>
    Connecting to: <strong>{{ geoserverUrl }}</strong> - Layer: <strong>{{ layerName }}</strong>
    <span v-if="isTransparentMode"> !!! Transparent mode !!!</span>
</div>
<LayerControl
    :opacity="opacity"
    :is-visible="isVisible"
    @update-opacity="handleUpdateOpacity"
    @toggle-layer="handleUpdateVisible"
/>
<router-view v-slot="{ Component }">
    <component 
        :is="Component" 
        :geoserver-url="geoserverUrl" 
        :layer-name="layerName"
        :opacity="opacity"
        :is-visible="isVisible"
    />
</router-view>
</template>

<style scoped></style>

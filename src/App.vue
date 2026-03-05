<script setup>
import { ref, computed, reactive } from 'vue'

import LayerControl from './components/LayerControl.vue'

const geoserverUrl = ref('http://localhost:8080/geoserver/bai_4/wms')
const layerName = ref('bai_4:NenDC')
const opacity = ref(1)
const isVisible = ref(true)
const coordinate = reactive({
    longitude: null,
    latitude: null
})
let showLayerControl = ref(true)

const isTransparentMode = computed(() => opacity.value < 1)

const handleUpdateOpacity = (newValue) => {
    opacity.value = Number(newValue)
}

const handleUpdateVisible = (newBoolean) => {
    isVisible.value = newBoolean
}

const handleUpdateCoordinate = (lat, lng) => {
    coordinate.longitude = lng
    coordinate.latitude = lat
}

</script>

<template>
<div>
    Connecting to: <strong>{{ geoserverUrl }}</strong> - Layer: <strong>{{ layerName }}</strong>
    <br/>
    <span v-if="isTransparentMode"> !!! Transparent mode !!!</span>
    <br/>
    <span> <strong>Latest click coordinate:</strong> {{ coordinate.longitude }} - {{ coordinate.latitude }} </span>
</div>
<button @click="showLayerControl = !showLayerControl">Settings</button>
<LayerControl
    v-show="showLayerControl"
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
        @update-coordinate="handleUpdateCoordinate"
    />
</router-view>
</template>

<style scoped></style>

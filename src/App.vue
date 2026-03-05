<script setup>
import { ref, computed } from 'vue'

const geoserverUrl = ref('http://localhost:8080/geoserver/bai_4/wms')
const layerName = ref('bai_4:NenDC')
const opacity = ref(1)

const isTransparentMode = computed(() => opacity.value < 1)

</script>

<template>
<div>
    Connecting to: <strong>{{ geoserverUrl }}</strong> - Layer: <strong>{{ layerName }}</strong>
    <span v-if="isTransparentMode"> (Transparent mode)</span>
</div>
<router-view v-slot="{ Component }">
    <component 
        :is="Component" 
        :geoserver-url="geoserverUrl" 
        :layer-name="layerName"
        :opacity="opacity"
    />
</router-view>
</template>

<style scoped></style>

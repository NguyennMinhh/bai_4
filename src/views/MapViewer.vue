<script setup>
import { ref, shallowRef, onMounted, toRefs } from 'vue';
import L from 'leaflet'

const props = defineProps({
    geoserverUrl: { type: String, required: true },
    layerName: { type: String, required: true },
    opacity: { type: Number, required: true },
})

// keep props reactive as refs so we can use .value in setup
const { geoserverUrl, layerName, opacity } = toRefs(props)

const myMap = ref(null)
const map = shallowRef(null)
const layers = shallowRef({})

onMounted(() => {
    map.value = L.map(myMap.value).setView([21.01367, 105.80100], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value)

    layers.value.NenDC = L.tileLayer.wms(geoserverUrl.value, {
        layers: layerName.value,
        format: 'image/png',
        transparent: true,
        opacity: opacity.value,
        srs: 'EPSG:3857',
    }).addTo(map.value)
})
</script>

<template>
    <div ref="myMap" class="full-screen">
        Loading Map...
    </div>
</template>

<style scoped>
.full-screen {
    height: 100vh;
}
</style>
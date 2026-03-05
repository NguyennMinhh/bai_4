<script setup>
import { ref, shallowRef, onMounted, toRefs, watch } from 'vue';
import L from 'leaflet'

const props = defineProps({
    geoserverUrl: { type: String, required: true },
    layerName: { type: String, required: true },
    opacity: { type: Number, required: true },
    isVisible: { type:Boolean, required: true }
})

// keep props reactive as refs so we can use .value in setup
const { geoserverUrl, layerName, opacity, isVisible } = toRefs(props)

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
        opacity: Number(opacity.value),
        srs: 'EPSG:3857',
    }).addTo(map.value)
})
// Khi props opacity thay đổi => gọi Leaflet API cập nhật layer, không reload map
watch(opacity, (newOpacity) => {
    layers.value.NenDC?.setOpacity(newOpacity)
})

watch(isVisible, (newValue) => {
    if(newValue) map.value?.addLayer(layers.value.NenDC)
    else map.value?.removeLayer(layers.value.NenDC)
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
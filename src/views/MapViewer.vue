<script setup>
import { ref, shallowRef, reactive, onMounted } from 'vue';
import L from 'leaflet'

const myMap = ref(null) 
const map = shallowRef(null)
const layers = shallowRef({})

onMounted(() => {
    map.value = L.map(myMap.value).setView([21.01367, 105.80100], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value)

    layers.value.NenDC = L.tileLayer.wms('http://localhost:8080/geoserver/bai_4/wms', {
        layers: 'bai_4:NenDC',
        format: 'image/png',
        transparent: true,
        version: '1.1.0',
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
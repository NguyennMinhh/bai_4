import { createRouter, createWebHistory } from 'vue-router'

import MapViewer from '@/views/MapViewer.vue'

const routes = [
  {
    path: '/',
    name: 'map',
    component: MapViewer
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

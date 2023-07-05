import { createRouter, createWebHistory } from 'vue-router'
import ActivitiesView from '../views/ActivitiesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ActivitiesView',
      component: ActivitiesView
    },
  ]
})

export default router

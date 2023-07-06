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
    {
      path: '/zoom/:activityId',
      component: () => import('../components/Zoom.vue'),
      props: route => ({ activityId: route.params.activityId })
    }
  ]
})

export default router

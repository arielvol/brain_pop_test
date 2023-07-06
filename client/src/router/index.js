import { createRouter, createWebHistory } from 'vue-router'
import ActivitiesView from '../views/ActivitiesView.vue'

const routes = [
  {
    path: '/',
    name: 'DefaultActivitiesView',
    component: ActivitiesView
  },
  {
    path: '/v1',
    name: 'ActivitiesViewV1',
    component: ActivitiesView
  },
  {
    path: '/v2',
    name: 'ActivitiesViewV2',
    component: ActivitiesView
  },
  {
    path: '/zoom/:activityId',
    name: 'ZoomDefault',
    component: () => import('../components/Zoom.vue'),
    props: (route) => ({ activityId: route.params.activityId })
  },
  {
    path: '/zoom/v1/:activityId',
    name: 'ZoomV1',
    component: () => import('../components/Zoom.vue'),
    props: (route) => ({ activityId: route.params.activityId })
  },
  {
    path: '/zoom//v2/:activityId',
    name: 'ZoomV2',
    component: () => import('../components/Zoom.vue'),
    props: (route) => ({ activityId: route.params.activityId })
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
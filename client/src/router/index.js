import { createRouter, createWebHistory } from 'vue-router'
import ActivitiesView from '../views/ActivitiesView.vue'

const routes = [
  {
    path: '/',
    name: 'DefaultActivitiesView',
    component: ActivitiesView
  },
  {
    path: '/zoom/:activityId',
    component: () => import('../components/Zoom.vue'),
    props: (route) => ({ activityId: route.params.activityId })
  },
  {
    path: '/:version',
    name: 'ActivitiesView',
    component: ActivitiesView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

// import { createRouter, createWebHistory } from 'vue-router'
// import ActivitiesView from '../views/ActivitiesView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'ActivitiesView',
//     component: ActivitiesView
//   },
//   {
//     path: '/zoom/:activityId',
//     component: () => import('../components/Zoom.vue'),
//     props: route => ({ activityId: route.params.activityId })
//   },
//   {
//     path: '/:version',
//     name: 'ActivitiesView',
//     component: ActivitiesView
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

// export default router

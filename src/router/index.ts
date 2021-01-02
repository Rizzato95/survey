import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Survey from '../views/SurveyView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Survey',
    component: Survey
  },
  {
    path: '/',
    name: 'Admin',
    component: () => import('../views/admin/AdminView.vue'),
    children: [
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/AdminView.vue')
      }
    ]

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/LoginView.vue'
import Survey from '../views/SurveyView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/survey',
    name: 'Survey',
    component: Survey
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

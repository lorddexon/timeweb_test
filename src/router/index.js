import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      title: 'Tilda analogue'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL
})

export default router

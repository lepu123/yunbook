import Vue from 'vue'
import VueRouter from 'vue-router'
import DetileView from '../views/DetileView.vue'
  
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DetileView,
    children: [
      {
        path: 'reading/:id',
        name: 'reading',
        component: () => import("../views/ReadingView.vue"),
      }
    ],
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

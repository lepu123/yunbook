import Vue from 'vue'
import VueRouter from 'vue-router'
import DetileView from '../views/DetileView.vue'
import HomeView from '../views/HomeView/HomeView.vue'
import SortView from "@/views/SortView/SortView";
import BookShelfView from "@/views/BookShelfView/BookShelfView";
import MimeView from "@/views/MimeView/MimeView";

Vue.use(VueRouter)

const routes = [
  // 自动重定向
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/detile',
    name: 'detile',
    component: DetileView,
    children: [
      {
        path: 'reading/:id',
        name: 'reading',
        component: () => import("../views/ReadingView.vue"),
      }
    ],
  },
  {
    path: '/sort',
    name: 'sort',
    component: SortView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/bookshelf',
    name: 'bookshelf',
    component: BookShelfView,
  },
  {
    path: '/mime',
    name: 'mime',
    component: MimeView,
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

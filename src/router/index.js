import Vue from 'vue'
import VueRouter from 'vue-router'
import DetileView from '../views/DetileView.vue'
import HomeView from '../views/HomeView/HomeView.vue'
import SortView from "@/views/SortView/SortView";
import BookShelfView from "@/views/BookShelfView/BookShelfView";
import MimeView from "@/views/MimeView/MimeView";
import BookMallView from '../views/BookMallVue/BookMallView.vue'
import ListeningView from '../views/ListeningView.vue'

import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(VueRouter)

const routes = [
  // 自动重定向
  {
    path: '',
    redirect: '/bookmallview'
  },
  {
    path: '/',
    redirect: '/bookmallview'
  },
  {
    path: '/detile/:bookid/:title',
    name: 'detile',
    component: DetileView,
    meta: {
      showFree: true,
      keepAlive: false,
    },
    children: [
      {
        path: 'reading/:id',
        name: 'reading',
        component: () => import("../views/ReadingView.vue"),
      }
    ]
  },
  {
    path: '/sort',
    name: 'sort',
    component: SortView,
    meta: {
      showFree: true,
      keepAlive: true,
    }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      showFree: true,
      keepAlive: true,
    }
  },
  {
    path: '/bookshelf',
    name: 'bookshelf',
    component: BookShelfView,
    meta: {
      showFree: true,
      keepAlive: true,
    }
  },
  {
    path: '/mime',
    name: 'mime',
    component: MimeView,
    meta: {
      showFree: true,
      keepAlive: true,
    }
  },
  {
    path: '/bookmallview',
    name: 'BookMallView',
    component: BookMallView,
    meta: {
      showFree: true,
      keepAlive: true,
    }
  },

  {
    path: '/ListeningView/:id',
    name: 'ListeningView',
    component: ListeningView,
    meta: {
      showFree: false,
      keepAlive: false,
    }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

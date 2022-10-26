import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookMallView from '../views/BookMallVue/BookMallView.vue'






import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/bookmallview',
    name: 'BookMallView',
    component: BookMallView
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import About from './views/About.vue'
import Brands from './views/Brands.vue'

const routes: Array<RouteRecordRaw> = [
  {path: '/', name: 'home', component: Home},
  {path: '/admin', name: 'admin', component: Admin},
  {path: '/about', name: 'about', component: About},
  {path: '/product/:id', name: 'brands', component: Brands},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import HomePage from '../views/HomePage.vue';
import Basket from '../views/Basket.vue';
import Configurator from '../views/Configurator.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  {
    path: '/configurator',
    name: 'Configurator',
    component: Configurator
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

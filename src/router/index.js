import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import HomePage from '../views/HomePage.vue'; 

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

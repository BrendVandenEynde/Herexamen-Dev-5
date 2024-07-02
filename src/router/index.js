import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import HomePage from '../views/HomePage.vue';
import Basket from '../views/Basket.vue';
import Configurator from '../views/Configurator.vue';
import OrderList from '../views/OrderList.vue';

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
    component: HomePage,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage
      },
      {
        path: 'basket',
        name: 'Basket',
        component: Basket
      },
      {
        path: 'configurator',
        name: 'Configurator',
        component: Configurator
      },
      {
        path: 'orderlist',
        name: 'OrderList',
        component: OrderList
      }
    ]
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
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: OrderList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

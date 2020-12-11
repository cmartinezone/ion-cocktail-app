import { createRouter, createWebHistory } from '@ionic/vue-router';
//import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue'),
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue'),
      },
    ],
  },

  {
    path: '/drinks-by-ingredient/:ingredient',
    name: 'drinks-by-ingredient',
    component: () => import('@/views/DrinksByIngredient.vue'),
  },

  {
    path: '/drink/:drinkId',
    name: 'drink',
    component: () => import('@/views/Drink.vue'),
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

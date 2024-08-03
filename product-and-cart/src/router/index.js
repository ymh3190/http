import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/ProductsView.vue';
import PastOrders from '../views/PastOrders.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductsView,
    },
    {
      path: '/past-orders',
      name: 'PastOrders',
      component: PastOrders,
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Video from '../views/Video.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/videos',
      name: 'videos',
      component: Video,
    },
  ],
});

export default router;

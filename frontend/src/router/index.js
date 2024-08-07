import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Video from '../views/Video.vue';
import Watch from '../views/Watch.vue';
import Subject from '../views/Subject.vue';
import AIs from '../views/AIs.vue';
import AI from '../views/AI.vue';
import Signin from '../views/Signin.vue';
import Signup from '../views/Signup.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/videos',
      name: 'videos',
      component: Video,
    },
    {
      path: '/watch',
      name: 'watch',
      component: Watch,
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: Subject,
    },
    {
      path: '/ais',
      name: 'ais',
      component: AIs,
    },
    {
      path: '/ais',
      name: 'ai',
      component: AI,
    },
  ],
});

export default router;

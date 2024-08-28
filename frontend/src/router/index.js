import { createRouter, createWebHistory } from 'vue-router';

import Signin from '../views/Signin.vue';
import Signup from '../views/Signup.vue';

import Home from '../views/Home.vue';
import Video from '../views/Video.vue';
import Watch from '../views/Watch.vue';
import Upload from '../views/Upload.vue';
import Image from '../views/Image.vue';
import Edit from '../views/Edit.vue';

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
      path: '/logout',
      name: 'logout',
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
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '/images',
      name: 'images',
      component: Image,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
  ],
});

export default router;

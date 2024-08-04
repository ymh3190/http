<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/videos">Videos</RouterLink>
    </nav>
  </header>

  <RouterView :videos="videos" />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import videos from './video.json';

export default {
  components: {
    RouterLink,
    RouterView,
  },
  data() {
    return {
      videos,
    };
  },
};
</script>

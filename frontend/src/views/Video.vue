<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="container">
      <RouterLink
        :to="{ name: 'watch', query: { v: video.file } }"
        v-for="video in videos"
        :key="video.id"
      >
        <Poster :video="video" />
      </RouterLink>
    </div>
  </main>
</template>

<script>
import Poster from '@/components/Poster.vue';

export default {
  props: ['videos'],
  components: {
    Poster,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
</style>

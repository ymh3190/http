<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="container">
      <RouterLink
        @click="scrollTo"
        :to="{ name: 'watch', query: { v: video.title } }"
        v-for="video in videos"
        :key="video.id"
      >
        <Image :src="video.poster" />
      </RouterLink>
    </div>
  </main>
</template>

<script>
import Image from '@/components/Image.vue';

export default {
  props: ['videos', 'scrollTo'],
  components: {
    Image,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
@media screen and (max-width: 400px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>

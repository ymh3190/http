<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="container">
      <RouterLink
        @click="scrollTo"
        :to="{ name: 'watch', query: { i: image.title } }"
        v-for="image in images"
        :key="image.id"
      >
        <Image :src="image.path" />
      </RouterLink>
    </div>
  </main>
</template>

<script>
import Image from '@/components/Image.vue';

export default {
  props: ['images', 'scrollTo'],
  components: {
    Image,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
img {
  border-radius: 10px;
}
@media screen and (max-width: 400px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>

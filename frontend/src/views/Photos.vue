<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="content">
      <div class="container">
        <RouterLink
          @click="scrollTo"
          :to="{ name: 'photo', query: { v: photo.file } }"
          v-for="photo in photos"
          :key="photo.id"
        >
          <Photo :photo="photo" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import Photo from '@/components/Photo.vue';

export default {
  props: ['photos', 'scrollTo'],
  components: {
    Photo,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

@media screen and (max-width: 400px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>

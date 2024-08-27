<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink
    @click="scrollTo"
    :to="{ name: 'watch', query: { v: recommendation.title } }"
    v-for="(recommendation, i) in recommendations"
    :key="i"
  >
    <Image :src="recommendation.poster" />
  </RouterLink>
</template>

<script>
import Image from './Image.vue';

export default {
  props: ['recommendations', 'scrollTo'],
  components: {
    Image,
  },
};
</script>

<style scoped>
img {
  height: 30vh;
}
</style>

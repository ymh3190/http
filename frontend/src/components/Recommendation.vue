<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink
    :to="{ name: 'watch', query: { v: recommendation.file } }"
    v-for="recommendation in recommendations"
    :key="recommendation.id"
  >
    <Poster :video="recommendation" />
  </RouterLink>
</template>

<script>
import Poster from './Poster.vue';

export default {
  props: ['recommendations'],
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>

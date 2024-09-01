<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div v-if="$route.query.v">
    <RouterLink
      @click="scrollTo"
      :to="{ name: 'watch', query: { v: recommendation.title } }"
      v-for="(recommendation, i) in recommendations"
      :key="i"
    >
      <Image :src="recommendation.poster" />
    </RouterLink>
  </div>
  <div v-else-if="$route.query.i">
    <RouterLink
      @click="scrollTo"
      :to="{ name: 'watch', query: { i: recommendation.title } }"
      v-for="(recommendation, i) in recommendations"
      :key="i"
    >
      <Image :src="recommendation.path" />
    </RouterLink>
  </div>
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
div {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
a {
  display: inline-block;
  height: 30vh;
}
img {
  height: 100%;
  border-radius: 10px;
}
</style>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink
    @click="scrollTo"
    :to="{ name: 'photo', query: { v: relavance.file } }"
    v-for="relavance in relavances"
    :key="relavance.id"
  >
    <Photo :photo="relavance" />
  </RouterLink>
</template>

<script>
import Photo from './Photo.vue';

export default {
  props: ['relavances', 'scrollTo'],
  components: {
    Photo,
  },
};
</script>

<style scoped>
img {
  justify-self: center;
  height: 40vh;
}
a {
  display: inline-block;
  justify-self: center;
}
</style>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink
    @click="scrollTo"
    :to="{ name: 'ai', query: { v: relavance.file } }"
    v-for="relavance in relavances"
    :key="relavance.id"
  >
    <AI :ai="relavance" />
  </RouterLink>
</template>

<script>
import AI from './AI.vue';

export default {
  props: ['relavances', 'scrollTo'],
  components: {
    AI,
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

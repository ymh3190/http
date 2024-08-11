<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink
    @click="scrollTo"
    :to="{ name: 'subject', query: { v: relavance.file } }"
    v-for="relavance in relavances"
    :key="relavance.id"
  >
    <Subject :subject="relavance" />
  </RouterLink>
</template>

<script>
import Subject from './Subject.vue';

export default {
  props: ['relavances', 'scrollTo'],
  components: {
    Subject,
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

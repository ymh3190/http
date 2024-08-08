<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="content">
      <div class="container">
        <RouterLink
          @click="scrollTo"
          :to="{ name: 'ai', query: { v: ai.file } }"
          v-for="ai in ais"
          :key="ai.id"
        >
          <AI :ai="ai" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import AI from '@/components/AI.vue';

export default {
  props: ['ais', 'scrollTo'],
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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

<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="content">
      <div class="container">
        <RouterLink
          @click="scrollTo"
          :to="{ name: 'subject', query: { v: subject.file } }"
          v-for="subject in subjects"
          :key="subject.id"
        >
          <Subject :subject="subject" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import Subject from '@/components/Subject.vue';

export default {
  props: ['subjects'],
  components: {
    Subject,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>

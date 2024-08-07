<template>
  <main>
    <div class="content">
      <div class="container">
        <Subject
          v-for="subject in subjects"
          :key="subject.id"
          :subject="subject"
        />
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

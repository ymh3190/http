<template>
  <main>
    <Video v-for="video in videos" :key="video.id" :video="video" />
  </main>
</template>

<script>
import Video from '@/components/Video.vue';
export default {
  props: ['videos'],
  components: {
    Video,
  },
};
</script>

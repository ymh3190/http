<template>
  <main>
    <div class="videos">
      <h1>Videos</h1>
      <Video :videos="previews.videos" />
    </div>
    <div class="ais">
      <h1>AIs</h1>
      <AIs :ais="previews.ais" :scrollTo="scrollTo" />
    </div>
  </main>
</template>

<script>
import Video from './Video.vue';
import AIs from './AIs.vue';

export default {
  props: ['scrollTo', 'previews'],
  components: {
    Video,
    AIs,
  },
};
</script>

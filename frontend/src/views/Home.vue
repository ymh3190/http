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
  props: ['videos', 'ais', 'scrollTo'],
  components: {
    Video,
    AIs,
  },
  data() {
    return {
      previews: { videos: [], ais: [] },
    };
  },
  beforeMount() {
    this.previews.videos = this.videos.filter(() => {
      if (Math.random() < 0.2) return true;
    });
    this.previews.ais = this.ais.filter(() => {
      if (Math.random() < 0.2) return true;
    });
  },
};
</script>

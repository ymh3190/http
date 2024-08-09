<template>
  <main>
    <div class="content">
      <div class="container">
        <Video :video="getVideo()" />
      </div>
      <div class="recommendations">
        <Recommendation
          :recommendations="getRecommendations()"
          :scrollTo="scrollTo"
        />
      </div>
    </div>
  </main>
</template>

<script>
import Video from '@/components/Video.vue';
import Recommendation from '@/components/Recommendation.vue';

export default {
  props: ['videos', 'scrollTo'],
  components: {
    Video,
    Recommendation,
  },
  data() {
    return {
      video: {},
      recommendations: [],
    };
  },
  methods: {
    getVideo() {
      this.video = this.videos.find(
        (video) => video.file === this.$route.query.v,
      );
      return this.video;
    },
    getRecommendations() {
      this.recommendations = this.videos.filter((video) => {
        if (video.file !== this.video.file) {
          return video.genre === this.video.genre;
        }
      });
      return this.recommendations;
    },
  },
};
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>

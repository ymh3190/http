<template>
  <main>
    <div class="content">
      <div class="container">
        <Video :video="getVideo()" autoplay muted loop />
        <div class="genres">
          <span v-for="genre in genres" :key="genre.id">{{ genre.name }}</span>
        </div>
      </div>
      <div class="recommendations">
        <Recommendation
          :recommendations="recommendations"
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
  props: ['scrollTo', 'videos'],
  components: {
    Video,
    Recommendation,
  },
  data() {
    return {
      video: {},
      genres: [],
      recommendations: [],
    };
  },
  watch: {
    video: {
      immediate: true,
      async handler() {
        if (Object.keys(this.video).length === 0) return;
        this.genres = await this.getGenre();
        this.recommendations = await this.getRecommendations();
      },
    },
  },
  methods: {
    getVideo() {
      this.video = this.videos.find(
        (video) => video.title === this.$route.query.v,
      );
      return this.video;
    },
    async getGenre() {
      const videoId = this.video.id;
      const res = await fetch(
        `http://${location.hostname}:4000/api/v1/genres?videoId=${videoId}`,
        {
          credentials: 'include',
        },
      );
      if (res.ok) {
        const data = await res.json();
        return data.genres;
      }
    },
    async getRecommendations() {
      const genres = this.genres;
      const recommendations = [];
      for (const genre of genres) {
        const res = await fetch(
          `http://${location.hostname}:4000/api/v1/genres?name=${genre.name}`,
          {
            credentials: 'include',
          },
        );
        if (res.ok) {
          const data = await res.json();
          const videoId = this.video.id;
          for (const genre of data.genres) {
            if (genre.videoId === videoId) continue;
            const res = await fetch(
              `http://${location.hostname}:4000/api/v1/videos/${genre.videoId}`,
              {
                credentials: 'include',
              },
            );
            if (res.ok) {
              const data = await res.json();
              const video = data.video;
              if (recommendations.indexOf(video) !== -1) continue;
              recommendations.push(video);
            }
          }
        }
      }
      return recommendations;
    },
  },
};
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.genres {
  height: 5vh;
}
.recommendations {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
video {
  height: 85vh;
}
span:not(:last-child) {
  margin-right: 10px;
}
</style>

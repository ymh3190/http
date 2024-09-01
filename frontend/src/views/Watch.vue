<template>
  <main>
    <div class="content">
      <div class="container" v-if="$route.query.v">
        <Video :video="getVideo()" autoplay muted loop />
        <div class="genres">
          <span v-for="genre in genres" :key="genre.id">{{ genre.name }}</span>
        </div>
      </div>
      <div class="container" v-else-if="$route.query.i">
        <Image :src="getImage()" />
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
import Image from '@/components/Image.vue';
import Recommendation from '@/components/Recommendation.vue';

export default {
  props: ['scrollTo', 'videos', 'fetchData', 'images'],
  components: {
    Video,
    Recommendation,
    Image,
  },
  data() {
    return {
      video: {},
      image: {},
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
    image: {
      immediate: true,
      async handler() {
        if (Object.keys(this.image).length === 0) return;
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
    getImage() {
      this.image = this.images.find(
        (image) => image.title === this.$route.query.i,
      );
      return this.image.path;
    },
    async getGenre() {
      if (this.$route.query.v) {
        const videoId = this.video.id;
        const data = await this.fetchData(`/genres?videoId=${videoId}`);
        if (data) {
          return data.genres;
        }
        return;
      }

      if (this.$route.query.i) {
        const imageId = this.image.id;
        const data = await this.fetchData(`/genres?imageId=${imageId}`);
        if (data) {
          return data.genres;
        }
      }
    },
    async getRecommendations() {
      const genres = this.genres;
      const recommendations = [];
      for (const genre of genres) {
        const data = await this.fetchData(`/genres?name=${genre.name}`);
        if (data) {
          if (this.$route.query.v) {
            const videoId = this.video.id;
            for (const genre of data.genres) {
              if (!genre.videoId) continue;
              if (genre.videoId === videoId) continue;
              const data = await this.fetchData(`/videos/${genre.videoId}`);
              if (data) {
                const video = data.video;
                const exist = recommendations.some((r) => r.id === video.id);
                if (exist) continue;
                recommendations.push(video);
              }
            }
            continue;
          }

          if (this.$route.query.i) {
            const imageId = this.image.id;
            for (const genre of data.genres) {
              if (!genre.imageId) continue;
              if (genre.imageId === imageId) continue;
              const data = await this.fetchData(`/images/${genre.imageId}`);
              if (data) {
                const image = data.image;
                const exist = recommendations.some((r) => r.id === image.id);
                if (exist) continue;
                recommendations.push(image);
              }
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
  column-gap: 10px;
}
.genres {
  height: 5vh;
}
video,
img {
  height: 85vh;
}
span:not(:last-child) {
  margin-right: 10px;
}
</style>

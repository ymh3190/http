<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHouse,
  faVideo,
  faImage,
  faMagnifyingGlass,
  faUpload,
  faScissors,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <header>
    <div>
      <a href="/">
        <img src="/logo.png" alt="" />
      </a>
    </div>
    <div>
      <nav>
        <RouterLink to="/"><FontAwesomeIcon :icon="faHouse" /></RouterLink>
        <RouterLink to="/videos"
          ><FontAwesomeIcon :icon="faVideo"
        /></RouterLink>
        <RouterLink to="/images"
          ><FontAwesomeIcon :icon="faImage"
        /></RouterLink>
      </nav>
    </div>
    <div class="container" v-if="isAuth">
      <form @submit.prevent="handleSubmit">
        <Input v-model="query" />
        <button>
          <FontAwesomeIcon :icon="faMagnifyingGlass" />
        </button>
      </form>
      <RouterLink to="/upload"><FontAwesomeIcon :icon="faUpload" /></RouterLink>
      <RouterLink to="/edit"><FontAwesomeIcon :icon="faScissors" /></RouterLink>
      <RouterLink to="/logout"
        ><FontAwesomeIcon :icon="faArrowRightFromBracket"
      /></RouterLink>
    </div>
    <div class="container" v-else>
      <RouterLink to="/signup">Join</RouterLink>
      <RouterLink to="/signin"
        ><FontAwesomeIcon :icon="faArrowRightToBracket"
      /></RouterLink>
    </div>
  </header>

  <RouterView
    :videos="videos"
    :images="images"
    :scrollTo="scrollTo"
    :previews="previews"
    :fetchData="fetchData"
  />
</template>

<script>
import Input from './components/Input.vue';

export default {
  components: {
    Input,
  },
  data() {
    return {
      videos: [],
      images: [],
      previews: { videos: [], images: [] },
      isAuth: false,
      query: '',
    };
  },
  methods: {
    scrollTo() {
      scrollTo(0, 0);
    },
    async fetchData(url) {
      const res = await fetch(`http://${location.hostname}:4000/api/v1` + url, {
        credentials: 'include',
      });
      if (res.ok) {
        return res.json();
      }
    },
    async handleSubmit() {
      const query = this.query;
      if (!query) return;

      this.previews.videos = [];
      this.previews.images = [];

      const data = await this.fetchData(`/genres?name=${query}`);
      if (data) {
        const genres = data.genres;
        genres.forEach(async (genre) => {
          if (genre.videoId) {
            const data = await this.fetchData(`/videos/${genre.videoId}`);
            if (data) {
              const video = data.video;
              this.previews.videos.push(video);
            }
            return;
          }
          if (genre.imageId) {
            const data = await this.fetchData(`/images/${genre.imageId}`);
            if (data) {
              const image = data.image;
              this.previews.images.push(image);
            }
          }
        });
      }
    },
  },
  async mounted() {
    const [data, data_] = await Promise.all([
      this.fetchData('/videos'),
      this.fetchData('/images'),
    ]);
    if (data && data_) {
      this.isAuth = true;

      this.videos = data.videos;
      this.previews.videos = data.videos;
      this.images = data_.images;
      this.previews.images = data_.images;
    }
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
}
header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  height: 10vh;
}
nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  height: 100%;
}
a {
  font-size: 20px;
  color: black;
  text-decoration: none;
  text-align: center;
}
img {
  justify-self: center;
  height: 10vh;
}
</style>

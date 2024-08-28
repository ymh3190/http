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
    <div class="logo">
      <a href="/">
        <img class="logo" src="/logo.png" alt="" />
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
    <div class="container">
      <form v-if="user" @submit.prevent="handleSubmit">
        <Input v-model="query" />
        <button>
          <FontAwesomeIcon :icon="faMagnifyingGlass" />
        </button>
      </form>
      <RouterLink v-if="user" to="/upload"
        ><FontAwesomeIcon :icon="faUpload"
      /></RouterLink>
      <RouterLink v-if="user" to="/edit"
        ><FontAwesomeIcon :icon="faScissors"
      /></RouterLink>
      <RouterLink v-if="user" to="/logout"
        ><FontAwesomeIcon :icon="faArrowRightFromBracket"
      /></RouterLink>
      <RouterLink v-if="!user" to="/signup">Join</RouterLink>
      <RouterLink v-if="!user" to="/signin"
        ><FontAwesomeIcon :icon="faArrowRightToBracket"
      /></RouterLink>
    </div>
  </header>

  <RouterView
    :videos="videos"
    :images="images"
    :scrollTo="scrollTo"
    :previews="previews"
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
      user: null,
      query: '',
    };
  },
  methods: {
    scrollTo() {
      scrollTo(0, 0);
    },
    async handleSubmit() {
      const query = this.query;
      if (!query) return;

      this.previews.videos = [];

      const res = await fetch(
        `http://${location.hostname}:4000/api/v1/genres?name=${query}`,
        {
          credentials: 'include',
        },
      );
      if (res.ok) {
        const data = await res.json();
        const genres = data.genres;
        for (const genre of genres) {
          const res = await fetch(
            `http://${location.hostname}:4000/api/v1/videos/${genre.videoId}`,
            {
              credentials: 'include',
            },
          );
          if (res.ok) {
            const data = await res.json();
            const video = data.video;
            this.previews.videos.push(video);
          }
        }
      }
    },
  },
  async mounted() {
    const [res, res_] = await Promise.all([
      fetch(`http://${location.hostname}:4000/api/v1/videos`, {
        credentials: 'include',
      }),
      fetch(`http://${location.hostname}:4000/api/v1/images`, {
        credentials: 'include',
      }),
    ]);
    if (res.ok && res_.ok) {
      this.user = {};

      const [data, data_] = await Promise.all([res.json(), res_.json()]);
      this.videos = data.videos;
      this.previews.videos = data.videos;
      this.images = data_.images;
      this.previews.images = data_.images;
    }
  },
};
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  height: 100%;
}

nav {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  height: 100%;
}

a {
  font-size: 20px;
  color: black;
  text-decoration: none;
  text-align: center;
}

.logo {
  justify-self: center;
  height: 10vh;
}

.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="logo">
      <a href="/">
        <img class="logo" src="/logo.png" alt="" />
      </a>
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/videos">Videos</RouterLink>
      <RouterLink to="/ais">AIs</RouterLink>
      <RouterLink to="/subjects">Subjects</RouterLink>
      <RouterLink to="/photos">Photos</RouterLink>
    </nav>
    <div class="container">
      <div></div>
      <RouterLink to="/signup">Sign up</RouterLink>
      <RouterLink to="/signin">Sign in</RouterLink>
    </div>
  </header>

  <RouterView
    :videos="videos"
    :subjects="subjects"
    :ais="ais"
    :scrollTo="scrollTo"
    :previews="previews"
    :photos="photos"
  />
</template>

<script>
import videos from '../mockData/video.json';
import subjects from '../mockData/subject.json';
import ais from '../mockData/ai.json';
import photos from '../mockData/photo.json';

export default {
  data() {
    return {
      videos,
      subjects,
      ais,
      previews: { videos: [], ais: [] },
      photos,
    };
  },
  methods: {
    scrollTo() {
      scrollTo(0, 0);
    },
  },
  mounted() {
    this.previews.videos = this.videos.filter(() => {
      if (Math.random() < 0.2) return true;
    });
    this.previews.ais = this.ais.filter(() => {
      if (Math.random() < 0.5) return true;
    });
  },
};
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  height: 10vh;
}

nav {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
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
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}
</style>

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
    v-model="user"
  />
</template>

<script>
import videos from '../mockData/video.json';
import subjects from '../mockData/subject.json';
import ais from '../mockData/ai.json';

export default {
  data() {
    return {
      videos,
      subjects,
      ais,
      user: {},
    };
  },
  methods: {
    scrollTo() {
      scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 10vh;

  nav,
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
}
</style>

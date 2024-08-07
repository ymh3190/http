<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/videos">Videos</RouterLink>
      <RouterLink to="/ais">AIs</RouterLink>
    </nav>
  </header>

  <RouterView :videos="videos" :subjects="subjects" :ais="ais" />
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
    };
  },
  async beforeCreate() {
    try {
      const response = await fetch('http://localhost:4000/api/v1/videos');
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
header {
  height: 10vh;

  nav > a:not(:last-child) {
    margin-right: 20px;
  }
}
a {
  text-decoration: none;
}
</style>

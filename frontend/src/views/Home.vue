<template>
  <main>
    <div class="videos">
      <Video :videos="previews.videos" :scrollTo="scrollTo" />
    </div>
    <div class="images">
      <Image :images="previews.images" :scrollTo="scrollTo" />
    </div>
  </main>
</template>

<script>
import Video from './Video.vue';
import Image from './Image.vue';

export default {
  props: ['scrollTo', 'previews'],
  components: {
    Video,
    Image,
  },
};
</script>

<style>
img {
  height: 30vh;
}
</style>

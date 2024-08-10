<template>
  <img v-if="!photo.type" :src="photo.path" />
  <video v-if="photo.type" :src="photo.path" autoplay muted loop></video>
</template>

<script>
export default {
  props: ['photo'],
};
</script>

<style scoped>
img,
video {
  border-radius: 10px;
  justify-self: center;
  height: 90vh;
}

@media screen and (max-width: 400px) {
  img {
    width: 100%;
  }
}
</style>

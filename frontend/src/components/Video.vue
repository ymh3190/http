<template>
  <video
    :src="video.path"
    :poster="video.poster"
    controls
    :autoplay="auto"
  ></video>
</template>

<script>
export default {
  props: ['video', 'auto'],
};
</script>

<style>
video {
  width: 100%;
}
</style>

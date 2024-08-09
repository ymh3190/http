<template>
  <video :src="video.path" :poster="video.poster" controls></video>
</template>

<script>
export default {
  props: ['video'],
};
</script>

<style>
video {
  width: 100%;
}
</style>

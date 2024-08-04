<template>
  <video :src="video.path" controls></video>
</template>

<script>
export default {
  props: ['video'],
};
</script>

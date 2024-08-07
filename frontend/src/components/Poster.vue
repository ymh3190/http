<template>
  <img :src="video.poster" />
</template>

<script>
export default {
  props: ['video'],
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>

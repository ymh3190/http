<template>
  <img :src="photo.path" />
</template>

<script>
export default {
  props: ['photo'],
};
</script>

<style scoped>
img {
  border-radius: 10px;
  justify-self: center;
  height: 40vh;
}

@media screen and (max-width: 400px) {
  img {
    width: 100%;
  }
}
</style>

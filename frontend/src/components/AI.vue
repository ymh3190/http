<template>
  <img :src="ai.path" />
</template>

<script>
export default {
  props: ['ai'],
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

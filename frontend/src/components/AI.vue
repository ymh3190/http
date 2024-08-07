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
  border-radius: 20px;
  justify-self: center;
  height: 40vh;
}
</style>

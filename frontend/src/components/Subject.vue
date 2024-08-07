<template>
  <img :src="subject.path" />
</template>

<script>
export default {
  props: ['subject'],
};
</script>

<style scoped>
img {
  justify-self: center;
  height: 25vh;
}
</style>

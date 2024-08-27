<template>
  <img :src="src" alt="" />
</template>

<script>
export default {
  props: ['src'],
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>

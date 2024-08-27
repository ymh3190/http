<template>
  <main>
    <div class="container">
      <Image v-for="image in images" :key="image.id" :src="image.path" />
    </div>
  </main>
</template>

<script>
import Image from '@/components/Image.vue';

export default {
  props: ['images'],
  components: {
    Image,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
img {
  border-radius: 10px;
}
@media screen and (max-width: 400px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>

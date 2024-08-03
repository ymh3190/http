<script setup>
// import food from "../food.json"
// `defineExpose` is a compiler macro and no longer needs to be imported
// import { defineExpose } from "vue"
// const inventory = food
// defineExpose({ inventory })
// import food from '../food.json';
// const inventory = food;
</script>

<template>
  <div class="splash-container">
    <div class="splash">
      <h1>Splendid Food</h1>
    </div>
  </div>

  <main class="wrapper">
    <h2>Recommended</h2>

    <div class="recommended">
      <ProductCard
        v-for="(product, index) in inventory.slice(0, 3)"
        :key="product.id"
        class="card"
        :index="index"
        :product="product"
        :addToCart="addToCart"
      />
    </div>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  props: ['inventory', 'addToCart'],
  components: {
    ProductCard,
  },
};
</script>

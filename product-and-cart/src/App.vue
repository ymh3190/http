<script setup>
import { RouterLink, RouterView } from 'vue-router';
// @: shortcut, ../../
// import Sidebar from '@/components/Sidebar.vue';
// import inventory from './views/HomeView.vue';
// import food from './views/HomeView.vue';
</script>

<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <RouterLink to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/products" class="top-bar-link">
        <span>Products</span>
      </RouterLink>
      <RouterLink to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </RouterLink>
    </nav>
    <div @click="toggleSidebar" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ totalQuantity }})</span>
    </div>
  </header>

  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>

        RouterLink: custom component, anchor tag substitution
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- RouterView: page content -->
  <!-- router will handle replacing this RouterView tag -->
  <!-- with whatever component we tell it to in our routes file -->
  <!-- that we are about to look at -->
  <!-- RouterView is just a temporary placeholder for whatever we put on the page -->

  <!-- views folder: there'll be their own pages, it is connected to the router -->
  <!-- components folder: it's not connected to the router -->
  <!-- things that are imported into other components -->
  <!-- components are meant to be parts of pages or reusable components -->
  <!-- that you use throughout your application -->
  <RouterView :inventory="inventory" :addToCart="addToCart" />

  <!-- assets folder: it is a place for usually -->
  <!-- css, images, anything like that to live  -->

  <Sidebar
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
  />
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import food from './food.json';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      showSidebar: false,
      inventory: food,
      cart: {},
    };
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, curr) => acc + curr, 0);
    },
  },
  methods: {
    addToCart(name, quantity) {
      if (!this.cart[name]) this.cart[name] = 0;
      this.cart[name] += quantity;
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    removeItem(name) {
      delete this.cart[name];
    },
  },
};
</script>

<!-- scoped: what I intend to do is only let it affect the App.vue -->
<!-- <style scoped>
move to assets/main.css
h1 {
  color: blue;
}
</style> -->

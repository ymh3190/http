<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
(async () => {
  const res = await fetch('http://localhost/api/v1/videos');
  const data = await res.json();
  console.log(data);
})();

export default {};
</script>

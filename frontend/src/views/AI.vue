<template>
  <main>
    <div class="content">
      <div class="container">
        <AI :ai="getAI()" />
      </div>
      <div class="relavances">
        <Relavance :relavances="getRelavances()" :scrollTo="scrollTo" />
      </div>
    </div>
  </main>
</template>

<script>
import AI from '@/components/AI.vue';
import Relavance from '@/components/Relavance.vue';

export default {
  props: ['ais', 'scrollTo'],
  components: {
    AI,
    Relavance,
  },
  data() {
    return {
      ai: {},
      relavances: [],
    };
  },
  methods: {
    getAI() {
      this.ai = this.ais.find((ai) => ai.file === this.$route.query.v);
      return this.ai;
    },
    getRelavances() {
      this.relavances = this.ais.filter((ai) => {
        if (ai.file !== this.ai.file) {
          return ai.genre === this.ai.genre;
        }
      });
      return this.relavances;
    },
  },
};
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.container {
  display: grid;

  img {
    height: 90vh;
  }
}
.relavances {
  display: grid;
}
</style>

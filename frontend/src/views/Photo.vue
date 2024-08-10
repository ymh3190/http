<template>
  <main>
    <div class="content">
      <div class="container">
        <Photo :photo="getPhoto()" />
      </div>
      <div class="relavances">
        <Relavance :relavances="getRelavances()" :scrollTo="scrollTo" />
      </div>
    </div>
  </main>
</template>

<script>
import Photo from '@/components/Photo.vue';
import Relavance from '@/components/Relavance.vue';

export default {
  props: ['photos', 'scrollTo'],
  components: {
    Photo,
    Relavance,
  },
  data() {
    return {
      photo: {},
      relavances: [],
    };
  },
  methods: {
    getPhoto() {
      this.photo = this.photos.find(
        (photo) => photo.file === this.$route.query.v,
      );
      return this.photo;
    },
    getRelavances() {
      this.relavances = this.photos.filter((photo) => {
        if (photo.file !== this.photo.file) {
          return true;
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
    height: 40vh;
  }
}
.relavances {
  display: grid;
}

@media screen and (max-width: 400px) {
  .content {
    gap: 10px;
  }
}
</style>

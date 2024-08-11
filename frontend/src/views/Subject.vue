<template>
  <main>
    <div class="content">
      <div class="container">
        <Subject :subject="getSubject()" />
      </div>
      <div class="relavances">
        <RelavanceSubject :relavances="getRelavances()" :scrollTo="scrollTo" />
      </div>
    </div>
  </main>
</template>

<script>
import Subject from '@/components/Subject.vue';
import RelavanceSubject from '@/components/RelavanceSubject.vue';

export default {
  props: ['subjects', 'scrollTo'],
  components: {
    Subject,
    RelavanceSubject,
  },
  data() {
    return {
      subject: {},
      relavances: [],
    };
  },
  methods: {
    getSubject() {
      this.subject = this.subjects.find(
        (subject) => subject.file === this.$route.query.v,
      );
      return this.subject;
    },
    getRelavances() {
      this.relavances = this.subjects.filter((subject) => {
        if (subject.file !== this.subject.file) {
          return subject.genre === this.subject.genre;
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

@media screen and (max-width: 400px) {
  .content {
    gap: 10px;
  }
}
</style>

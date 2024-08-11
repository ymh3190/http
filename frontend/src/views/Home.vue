<template>
  <main>
    <div class="videos">
      <h1>Videos</h1>
      <Video :videos="previews.videos" />
    </div>
    <div class="ais">
      <h1>AIs</h1>
      <AIs :ais="previews.ais" :scrollTo="scrollTo" />
    </div>
    <div class="subjects">
      <h1>Subjects</h1>
      <Subjects :subjects="previews.subjects" :scrollTo="scrollTo" />
    </div>
    <div class="photos">
      <h1>Photos</h1>
      <Photos :photos="previews.photos" :scrollTo="scrollTo" />
    </div>
  </main>
</template>

<script>
import Video from './Video.vue';
import AIs from './AIs.vue';
import Photos from './Photos.vue';
import Subjects from './Subjects.vue';

export default {
  props: ['scrollTo', 'previews'],
  components: {
    Video,
    AIs,
    Photos,
    Subjects,
  },
};
</script>

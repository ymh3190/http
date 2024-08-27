<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <input type="file" name="file" @change="handleChange" multiple />
      <div v-for="(file, i) in files" :key="i">
        <h1>{{ file.name }}</h1>
        <label>
          Genres
          <input type="text" v-model="genres[i]" />
        </label>
      </div>
      <button>Upload</button>
    </form>
  </main>
</template>

<script>
import Input from '@/components/Input.vue';

export default {
  components: {
    Input,
  },
  data() {
    return {
      files: [],
      genres: [],
    };
  },
  methods: {
    async handleSubmit() {
      const isImage = this.files[0].type.includes('image');
      if (isImage) {
        for (let i = 0; i < this.files.length; i++) {
          const title = this.files[i].name.split('.')[0];

          const res = await fetch(
            `http://${location.hostname}:4000/api/v1/images`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title,
                type: this.files[i].type,
                path: `/images/${this.files[i].name}`,
              }),
              credentials: 'include',
            },
          );
          if (res.ok) {
            const data = await res.json();
            const image = data.image;
            const genres = this.genres[i].trim().split(' ');
            for (const genre of genres) {
              await fetch(`http://${location.hostname}:4000/api/v1/genres`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: genre.trim(),
                  imageId: image.id,
                }),
                credentials: 'include',
              });
            }
          }
        }
        return;
      }

      const isVideo = this.files[0].type.includes('video');
      if (isVideo) {
        for (let i = 0; i < this.files.length; i++) {
          const title = this.files[i].name.split('.')[0];

          const res = await fetch(
            `http://${location.hostname}:4000/api/v1/videos`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title,
                type: this.files[i].type,
                path: `/videos/${this.files[i].name}`,
                poster: `/posters/${title}.png`,
              }),
              credentials: 'include',
            },
          );
          if (res.ok) {
            const data = await res.json();
            const video = data.video;
            const genres = this.genres[i].trim().split(' ');
            for (const genre of genres) {
              await fetch(`http://${location.hostname}:4000/api/v1/genres`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: genre.trim(),
                  videoId: video.id,
                }),
                credentials: 'include',
              });
            }
          }
        }
      }
    },
    handleChange(e) {
      const files = e.target.files;
      for (const file of files) {
        this.files.push({
          name: file.name,
          type: file.type,
        });
      }
    },
  },
};
</script>

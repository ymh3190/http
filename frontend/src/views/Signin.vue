<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <Input
        v-for="(input, i) in inputs"
        :key="i"
        v-model="input.value"
        :label="input.label"
        :type="input.type"
      />
      <button>Sign in</button>
    </form>
  </main>
</template>

<script>
import Input from '@/components/Input.vue';

export default {
  props: ['user'],
  components: {
    Input,
  },
  data() {
    return {
      inputs: [
        {
          label: 'Email',
          value: '',
          type: 'email',
        },
        {
          label: 'Password',
          value: '',
          type: 'password',
        },
      ],
    };
  },
  methods: {
    async handleSubmit() {
      const email = this.inputs[0].value;
      const password = this.inputs[1].value;
      const res = await fetch('http://localhost:4000/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: 'admin',
          password,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return;
      }
    },
  },
};
</script>

<style scoped></style>

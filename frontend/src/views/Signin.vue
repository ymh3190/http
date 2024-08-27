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
          label: 'Username',
          value: '',
          type: 'text',
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
      const username = this.inputs[1].value;
      const password = this.inputs[2].value;

      const res = await fetch(
        `http://${location.hostname}:4000/api/v1/auth/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            username,
            password,
            email,
          }),
        },
      );
      if (res.ok) location.href = '/';
    },
  },
};
</script>

<style scoped></style>

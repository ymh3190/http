<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <Input
        v-for="(input, i) in inputs"
        :key="i"
        v-model="input.value"
        :type="input.type"
        :label="input.label"
      />
      <button>Sign up</button>
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
        {
          label: 'Confirm password',
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
      const rePassword = this.inputs[3].value;

      if (!username || !password || !rePassword) return;

      if (password !== rePassword) return;

      const res = await fetch(
        `http://${location.hostname}:4000/api/v1/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, email }),
        },
      );
      if (res.ok) location.href = '/signin';
    },
  },
};
</script>

<style scoped></style>

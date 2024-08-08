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
      const password = this.inputs[1].value;
      const rePassword = this.inputs[2].value;

      if (!email || !password || !rePassword) {
        return;
      }

      if (password !== rePassword) {
        return;
      }

      const res = await fetch('http://localhost:4000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'admin', password }),
      });
      if (res.ok) {
        location.href = '/signin';
      }
    },
  },
};
</script>

<style scoped></style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  // Simulate a login process (no backend involved for now)
  // For demonstration, check if username and password are not empty
  if (username.value !== '' && password.value !== '') {
    // Navigate to the home page after successful login
    router.push({ name: 'Home' });
  } else {
    alert('Please enter username and password'); // Handle empty fields
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/Button.vue';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  if (username.value && password.value) {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username.value,
          password: password.value
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and username in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name); // Save username
        router.push({ name: 'Home' });
      } else {
        // Display detailed error message
        alert(data.msg || 'Error logging in user');
      }
    } catch (error) {
      alert('Error logging in user');
    }
  } else {
    alert('Please enter username and password');
  }
};
</script>

<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">E-mail:</label>
        <input type="text" id="username" v-model="username" placeholder="E-mail" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="Password" required />
      </div>
      <Button type="login" @click="handleLogin">Login</Button>
      <div class="form-links">
        <Button type="register" @click="router.push({ name: 'Register' })">Register</Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  background-color: #ffffffE8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.login-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 95%;
  padding: 10px;
  border: 2px solid #000000;
}

.form-links {
  margin-top: 10px;
  text-align: center;
}
</style>
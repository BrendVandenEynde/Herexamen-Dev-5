<script setup>
const handleLogin = async () => {
    if (username.value !== '' && password.value !== '') {
        try {
            const response = await fetch('http://your-backend-url/api/v1/auth/login', {
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
                // Save token and redirect to home
                localStorage.setItem('token', data.token);
                router.push({ name: 'Home' });
            } else {
                alert(data.msg);
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
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
      <div class="form-links">
        <button type="button" @click="goToRegister" class="link-button">Register</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  background-color: #fff;
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.form-links {
  margin-top: 10px;
  text-align: center;
}

.link-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  margin: 5px;
}

.link-button:hover {
  text-decoration: underline;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/Button.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const country = ref('');
const router = useRouter();

const handleRegister = async () => {
    if (name.value && email.value && password.value && country.value) {
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    country: country.value
                })
            });
            const data = await response.json();
            if (response.ok) {
                // Save token and redirect to home
                localStorage.setItem('token', data.token);
                router.push({ name: 'Home' });
            } else {
                // Display detailed error message
                alert(data.msg || 'Error registering user');
            }
        } catch (error) {
            alert('Error registering user');
        }
    } else {
        alert('Please fill in all fields');
    }
};
</script>

<template>
    <div class="register-form">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" placeholder="Name" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" placeholder="Email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" placeholder="Password" required />
            </div>
            <div class="form-group">
                <label for="country">Country:</label>
                <input type="text" id="country" v-model="country" placeholder="Country" required />
            </div>
            <!-- Apply the 'register' type to the Register button -->
            <Button type="register" class="full-width">Register</Button>
            <div class="form-links">
                <!-- Apply the 'login' type to the Back to Login button -->
                <Button type="login" class="full-width" @click="router.push({ name: 'Login' })">Back to Login</Button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.register-form {
    background-color: #ffffffE8;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.register-form h2 {
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
    width: 94%;
    padding: 10px;
    border: 2px solid #000000;
}

.full-width {
    width: 100%;
}

.form-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    text-align: center;
}
</style>
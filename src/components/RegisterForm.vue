<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const country = ref('');
const router = useRouter();

const handleRegister = () => {
    // Simulate a registration process (no backend involved for now)
    // For demonstration, check if all fields are filled
    if (name.value !== '' && email.value !== '' && password.value !== '' && country.value !== '') {
        // Navigate to the home page after successful registration
        router.push({ name: 'Home' });
    } else {
        alert('Please fill in all fields'); // Handle empty fields
    }
};
</script>

<template>
    <div class="register-form">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div>
                <label for="country">Country:</label>
                <input type="text" id="country" v-model="country" required />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<style scoped>
.register-form {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
}

.register-form h2 {
    margin-bottom: 20px;
}

.register-form div {
    margin-bottom: 15px;
}

.register-form label {
    display: block;
    margin-bottom: 5px;
}

.register-form input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.register-form button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.register-form button:hover {
    background-color: #0056b3;
}
</style>

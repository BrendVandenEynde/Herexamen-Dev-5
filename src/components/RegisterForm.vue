<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/Button.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const country = ref('');
const street = ref('');
const houseNumber = ref('');
const city = ref('');
const postalCode = ref('');
const router = useRouter();

const handleRegister = async () => {
    if (name.value && email.value && password.value && country.value && street.value && houseNumber.value && city.value && postalCode.value) {
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
                    country: country.value,
                    street: street.value,
                    houseNumber: houseNumber.value,
                    city: city.value,
                    postalCode: postalCode.value
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.msg || 'Error registering user');
                console.error('Server Response:', errorData);
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            router.push({ name: 'Home' });
        } catch (error) {
            console.error('Error registering user:', error);
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
            <div class="form-group">
                <label for="street">Street:</label>
                <input type="text" id="street" v-model="street" placeholder="Street" required />
            </div>
            <div class="form-group">
                <label for="houseNumber">House Number:</label>
                <input type="text" id="houseNumber" v-model="houseNumber" placeholder="House Number" required />
            </div>
            <div class="form-group">
                <label for="city">City:</label>
                <input type="text" id="city" v-model="city" placeholder="City" required />
            </div>
            <div class="form-group">
                <label for="postalCode">Postal Code:</label>
                <input type="text" id="postalCode" v-model="postalCode" placeholder="Postal Code" required />
            </div>
            <Button type="register" class="full-width" @click.prevent="handleRegister">Register</Button>
            <div class="form-links">
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

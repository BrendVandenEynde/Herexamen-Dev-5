<script setup>
const handleRegister = async () => {
    if (name.value !== '' && email.value !== '' && password.value !== '' && country.value !== '') {
        try {
            const response = await fetch('http://your-backend-url/api/v1/auth/register', {
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
                alert(data.msg);
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
            <button type="submit" class="register-button">Register</button>
        </form>
        <div class="form-links">
            <button type="button" @click="goToLogin" class="link-button">Back to Login</button>
        </div>
    </div>
</template>

<style scoped>
.register-form {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    margin: auto;
    margin-top: 50px;
}

.register-form h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
}

.register-form div {
    margin-bottom: 15px;
}

.register-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.register-form input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.register-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    margin-top: 10px;
}

.register-button:hover {
    background-color: #0056b3;
}

.form-links {
    margin-top: 15px;
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
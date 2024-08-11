<script setup>
import { useRouter } from 'vue-router';
import Button from '../components/Button.vue';

const router = useRouter();

const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to login page
    router.push({ name: 'Login' });
};
</script>

<template>
    <nav>
        <div class="navbar-container">
            <div class="logo">
                <img src="../assets/Swear-logo.png" alt="Company Logo" />
            </div>
            <ul class="nav-links">
                <li><router-link to="/home">Home</router-link></li>
                <li><router-link to="/configurator">Configurator</router-link></li>
                <li><router-link to="/basket">Basket</router-link></li>
                <li><router-link to="/orderlist">Order List</router-link></li>
                <li><Button type="log-out" @click="handleLogout">Logout</Button></li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
nav {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 2rem;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    overflow: hidden;
}

.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    width: 100%;
}

.logo {
    flex: 0 0 auto;
}

.logo img {
    height: 50px;
    width: auto;
}

.nav-links {
    list-style-type: none;
    display: flex;
    gap: 1.5rem;
    margin-right: 3%;
    padding: 0;
    align-items: center;
}

.nav-links li {
    display: flex;
    align-items: center;
}

a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: inline-flex;
    align-items: center;
}

a:hover {
    background-color: #007bff;
    color: white;
}

button {
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: inline-flex;
    align-items: center;
}

button:hover {
    background-color: #0056b3;
}
</style>
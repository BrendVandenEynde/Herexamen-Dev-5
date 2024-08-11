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
        <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/configurator">Configurator</router-link></li>
            <li><router-link to="/basket">Basket</router-link></li>
            <li><router-link to="/orderlist">Order List</router-link></li>
            <li><Button type="log-out" @click="handleLogout">Logout</Button></li>
        </ul>
    </nav>
</template>

<style scoped>
nav {
    background-color: #f0f0f0;
    padding: 1rem;
}

ul {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
}

li {
    margin-right: 1rem;
}
</style>
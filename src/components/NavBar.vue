<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
    router.push({ name: 'Login' });
};
</script>

<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/basket">Basket</router-link></li>
            <li><router-link to="/configurator">Configurator</router-link></li>
            <li><router-link to="/orderlist">Order List</router-link></li>
            <li><button @click="handleLogout">Logout</button></li>
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

button {
    background-color: #ff6347;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

button:hover {
    background-color: #ff473a;
}
</style>

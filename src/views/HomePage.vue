<script setup>
import Home from '../components/HomeComp.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
    // Perform logout actions (e.g., clear session, reset state)
    // Redirect to login page after logout
    router.push({ name: 'Login' });
};
</script>

<template>
    <div>
        <Home />
        <button @click="handleLogout">Logout</button>
    </div>
</template>
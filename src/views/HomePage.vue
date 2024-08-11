<script setup>
import HomeComp from '../components/HomeComp.vue';
import Navbar from '../components/Navbar.vue';
</script>

<template>
    <div class="page-container">
        <Navbar />
        <HomeComp />
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
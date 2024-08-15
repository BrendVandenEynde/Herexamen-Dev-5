<script setup>
import { ref, onMounted } from 'vue';

const userName = ref('');

// Fetch user’s name from local storage on component mount
onMounted(() => {
  userName.value = localStorage.getItem('userName');
});
</script>

<template>
  <div>
    <h2>Home</h2>
    <p v-if="userName">Welcome!</p>
    <p v-else>Welcome to the home page!</p>
  </div>
</template>

<style scoped></style>
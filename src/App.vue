
<script setup>
// No script setup logic needed if not importing additional logic here
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped>
/* Scoped styles specific to App.vue */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

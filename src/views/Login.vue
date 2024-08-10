<script setup>
import LoginForm from '../components/LoginComp.vue';
</script>

<template>
  <div class="login-container">
    <video class="background-video" autoplay muted loop>
      <source src="../assets/background-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <LoginForm />
  </div>
</template>

<style scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.login-container {
  z-index: 1;
}
</style>

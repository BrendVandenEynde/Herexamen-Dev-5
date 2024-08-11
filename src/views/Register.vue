<script setup>
import RegisterForm from '../components/RegisterForm.vue';
</script>

<template>
    <div class="register-container">
        <video class="background-video" autoplay muted loop>
            <source src="../assets/background-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <RegisterForm />
    </div>
</template>

<style scoped>
.register-container {
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

.register-container>RegisterForm {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    circles: {
        type: Array,
        required: true
    },
    activeMenu: {
        type: String,
        default: null
    }
});

const emits = defineEmits(['toggleMenu']);

const toggleMenu = (circleId) => {
    emits('toggleMenu', circleId);
};
</script>

<template>
    <div class="left-menu">
        <div v-for="circle in circles" :key="circle.id" class="circle" @click="toggleMenu(circle.id)"
            :class="{ active: circle.id === activeMenu }">
            {{ circle.name }}
        </div>
    </div>
</template>

<style scoped>
.left-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 60px;
    height: 100%;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
}

.circle {
    width: 40px;
    height: 40px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.circle:hover {
    background-color: #c2f703;
}

.active {
    background-color: #ff0000;
}
</style>

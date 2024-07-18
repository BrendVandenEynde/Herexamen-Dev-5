<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    activeMenu: {
        type: String,
        default: null
    },
    colorOptions: {
        type: Array,
        required: true
    }
});

const emits = defineEmits(['closeMenu', 'selectColor']);

const closeMenu = () => {
    emits('closeMenu');
};

const selectColor = (part, color) => {
    emits('selectColor', part, color);
};
</script>

<template>
    <transition name="menu-slide">
        <div v-if="activeMenu !== null" class="menu-overlay">
            <div class="menu-content">
                <template v-if="activeMenu === 'laces'">
                    <h2>Select Color for Laces</h2>
                    <div class="color-options">
                        <div v-for="color in colorOptions" :key="color" class="color-option"
                            :style="{ backgroundColor: color }" @click="selectColor('laces', color)"></div>
                    </div>
                </template>
                <button @click="closeMenu">Close</button>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 4;
    overflow-x: hidden;
    transition: width 0.3s ease;
}

.menu-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: 100%;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
    transition: transform 0.3s;
}

.menu-slide-enter,
.menu-slide-leave-to {
    transform: translateX(-100%);
}

.color-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
}

.color-option {
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 50%;
    cursor: pointer;
}

.color-option:hover {
    transform: scale(1.1);
}
</style>

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
    },
    shoeSize: {
        type: Number,
        default: 42
    }
});

const emits = defineEmits(['closeMenu', 'selectColor', 'update:shoeSize']);

const closeMenu = () => {
    emits('closeMenu');
};

const selectColor = (part, color) => {
    emits('selectColor', part, color);
};

const updateShoeSize = (event) => {
    emits('update:shoeSize', Number(event.target.value));
};
</script>

<template>
    <transition name="menu-slide">
        <div v-if="activeMenu !== null" class="menu-overlay">
            <div class="menu-content">
                <template v-if="activeMenu !== 'options'">
                    <h2>Select Color for {{ activeMenu }}</h2>
                    <div class="color-options">
                        <div v-for="color in colorOptions" :key="color" class="color-option"
                            :style="{ backgroundColor: color }" @click="selectColor(activeMenu, color)"></div>
                    </div>
                </template>
                <template v-else>
                    <h2>Options</h2>
                    <input type="number" :value="shoeSize" @input="updateShoeSize" placeholder="Enter shoe size" />
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

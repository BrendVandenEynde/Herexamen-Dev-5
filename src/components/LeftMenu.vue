<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';

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

const router = useRouter();
const showPopup = ref(false);

const toggleMenu = (circleId) => {
    emits('toggleMenu', circleId);
};

const goBackToHomepage = () => {
    showPopup.value = true;
};

const confirmCancel = () => {
    showPopup.value = false;
    router.push({ name: 'Home' });
};

const cancelCancel = () => {
    showPopup.value = false;
};

const confirmConfiguration = () => {
    // Implement the logic to confirm configuration
    alert('Configuration confirmed!');
};

// Map IDs to display names
const getDisplayName = (id) => {
    const names = {
        'laces': 'Laces',
        'inside': 'Inner Lining',
        'outside_1': 'Upper Exterior',
        'sole_1': 'Midsole',
        'sole_2': 'Outsole',
        'jewelry': 'Jewelry',
        'options': 'Options'
    };
    return names[id] || id;
};
</script>

<template>
    <div class="left-menu">
        <!-- New "Back to Homepage" button at the top -->
        <div class="menu-option back-button" @click="goBackToHomepage">
            Back to Homepage
        </div>

        <!-- Existing shoe options (not touched) -->
        <div class="shoe-options">
            <div v-for="circle in circles" :key="circle.id" class="circle" @click="toggleMenu(circle.id)"
                :class="{ active: circle.id === activeMenu }">
                {{ getDisplayName(circle.id) }}
            </div>
        </div>

        <!-- New "Confirm Configuration" button at the bottom -->
        <div class="menu-option confirm-button" @click="confirmConfiguration">
            Confirm Configuration
        </div>

        <!-- Confirmation Popup -->
        <transition name="popup">
            <div v-if="showPopup" class="popup-overlay">
                <div class="popup-content">
                    <h3>Do you really want to cancel the configuration?</h3>
                    <button @click="confirmCancel">Yes</button>
                    <button @click="cancelCancel">No</button>
                </div>
            </div>
        </transition>
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
    justify-content: space-between;
    /* Space between top and bottom elements */
    z-index: 3;
}

.menu-option {
    width: 100%;
    height: 40px;
    background-color: #fff;
    color: #333;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
}

.menu-option:hover {
    background-color: #c2f703;
}

.back-button {
    margin-bottom: 20px;
    /* Space below the back button */
}

.shoe-options {
    display: flex;
    flex-direction: column;
    align-items: center;
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

.confirm-button {
    margin-top: 20px;
    /* Space above the confirm button */
}

/* Popup styles */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
}

.popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

.popup-content button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
}

.popup-content button:hover {
    background-color: #0056b3;
}

.popup-content h3 {
    margin-bottom: 20px;
}
</style>

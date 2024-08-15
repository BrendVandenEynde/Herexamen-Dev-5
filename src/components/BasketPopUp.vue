<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    order: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close']);

// Function to close the popup
const closePopup = () => {
    emit('close');
};
</script>

<template>
    <div class="popup-overlay" @click.self="closePopup">
        <div class="popup-content">
            <button class="close-button" @click="closePopup">✕</button>
            <h3>{{ order.title || 'No Title' }}</h3>
            <p>Colors: {{ JSON.stringify(order.colorOptions) || 'No Colors' }}</p>
            <p>Materials: {{ JSON.stringify(order.materialOptions) || 'No Materials' }}</p>
            <p>Jewelry: {{ order.jewelryOptions.join(', ') || 'No Jewelry' }}</p>
            <p>Size: {{ order.size || 'N/A' }}</p>
            <p>Price: {{ order.price || 'N/A' }}</p>
        </div>
    </div>
</template>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.popup-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    position: relative;
    max-width: 500px;
    width: 100%;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: black;
}
</style>
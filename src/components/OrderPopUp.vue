<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    order: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close']);

const closePopup = () => {
    emit('close');
};
</script>

<template>
    <div class="popup-overlay" @click.self="closePopup">
        <div class="popup-content">
            <button class="close-button" @click="closePopup">✕</button>
            <h3>{{ order.title || 'No Title' }}</h3>
            <p><strong>Price:</strong> {{ order.price || 'N/A' }}</p>
            <p><strong>Size:</strong> {{ order.size || 'N/A' }}</p>
            <p><strong>Colors:</strong> {{ order.colorOptions.length > 0 ? order.colorOptions.join(', ') : 'No Colors' }}</p>
            <p><strong>Materials:</strong> {{ order.materialOptions.length > 0 ? order.materialOptions.join(', ') : 'No Materials' }}</p>
            <p><strong>Jewelry:</strong> {{ order.jewelryOptions.length > 0 ? order.jewelryOptions.join(', ') : 'No Jewelry' }}</p>
            <p><strong>Picked By:</strong> {{ order.user?.name || 'Unknown' }}</p>
            <p><strong>Email:</strong> {{ order.user?.email || 'No Email Provided' }}</p>
            <p><strong>Address:</strong> {{ order.user ? `${order.user.street}, ${order.user.houseNumber}, ${order.user.city}, ${order.user.postalCode}` : 'No Address Provided' }}</p>
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
    z-index: 1000; /* Ensure it is above all other content */
}

.popup-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 90vw; /* Responsive width for smaller screens */
    width: 100%;
    position: relative;
    z-index: 1001; /* Ensure content is above the overlay */
    transform: translateY(0);
    opacity: 1;
    transition: opacity 0.3s ease, transform 0.3s ease;
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
    z-index: 1002; /* Ensure button is above content */
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

button:hover {
    background-color: #69FF47;
}
</style>
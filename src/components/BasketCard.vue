<script setup>
import { ref } from 'vue';
import OrderPopUp from './OrderPopUp.vue';

const props = defineProps({
    order: {
        type: Object,
        required: true
    }
});

const showPopup = ref(false);

const showDetails = () => {
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};

const order = {
    title: 'Sample Item',
    description: 'This is a detailed description of the item.',
    price: 29.99,
    ...props.order
};
</script>

<template>
    <div class="basket-card">
        <img :src="order.image" alt="Basket Item Image" class="basket-image" />

        <div class="order-details">
            <p>{{ order.datetime }}</p>
            <div class="button-container">
                <button @click="showDetails">Details</button>
                <button @click="removeOrder">Remove order </button>
            </div>
        </div>

        <OrderPopUp v-if="showPopup" :order="order" @close="closePopup" />
    </div>
</template>

<style scoped>
.basket-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    max-width: 300px;
}

.basket-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
}

.order-details {
    margin-top: 0.5rem;
    text-align: center;
}

.button-container {
    margin-top: 0.5rem;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-right: 0.5rem;
}

button:hover {
    background-color: #0056b3;
}
</style>
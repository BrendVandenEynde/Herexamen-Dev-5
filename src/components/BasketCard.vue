<script setup>
import { ref, defineProps } from 'vue';
import OrderPopUp from './OrderPopUp.vue';
import Button from './Button.vue'; // Import the Button component

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

const confirmOrder = () => {
    // Implement order confirmation logic here
    alert('Order confirmed!');
};

const removeOrder = () => {
    // Implement order removal logic here
    alert('Order removed!');
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

        <div class="order-info">
            <h3>{{ order.title }}</h3>
            <p class="datetime">{{ order.datetime }}</p>
            <Button type="details" @click="showDetails">Details</Button>
            <div class="button-container">
                <Button type="confirm" @click="confirmOrder">Confirm</Button>
                <Button type="remove" @click="removeOrder">Remove</Button>
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
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    padding: 1rem;
    margin-bottom: 1rem;
    max-width: 350px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.basket-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
}

.basket-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
}

.order-info {
    padding: 1rem;
    text-align: center;
}

.order-info h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #333;
}

.datetime {
    color: #666;
    font-size: 0.875rem;
}

.button-container {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}
</style>
<script setup>
import { ref, defineProps, computed } from 'vue';
import OrderPopUp from './OrderPopUp.vue';
import Button from './Button.vue';

// Define the properties that the component will accept
const props = defineProps({
    order: {
        type: Object,
        required: true
    },
    variant: {
        type: String,
        default: 'list',
        validator: (value) => ['list', 'basket'].includes(value)
    }
});

// State to control the visibility of the order details popup
const showPopup = ref(false);

// Function to show the details popup
const showDetails = () => {
    showPopup.value = true;
};

// Function to close the details popup
const closePopup = () => {
    showPopup.value = false;
};

// Function to handle the "Buy" button click
const buyOrder = () => {
    alert('Thank you for your purchase! Your order has been successfully placed.');
};

// Function to handle the "Remove" button click
const removeOrder = () => {
    if (confirm('Are you sure you want to remove this item from your basket? This action cannot be undone.')) {
        alert('The item has been removed from your basket.');
        // Additional logic to remove the item can be placed here
    }
};

// Computed property to convert the image data to a usable format for the `img` tag
const imageSrc = computed(() => {
    if (props.order.image && props.order.image.data) {
        const imageData = new Uint8Array(props.order.image.data);
        const base64String = btoa(String.fromCharCode(...imageData));
        return `data:${props.order.imageType};base64,${base64String}`;
    }
    return ''; // Return an empty string if there's no image data
});
</script>

<template>
    <div class="basket-card">
        <!-- Display the image if available -->
        <img v-if="imageSrc" :src="imageSrc" alt="Basket Item Image" class="basket-image" />
        <div v-else class="basket-image-placeholder">No Image Available</div>

        <!-- Display the order title -->
        <div class="order-info">
            <h3>{{ order.title }}</h3>

            <!-- Button to show the details popup -->
            <Button type="details" @click="showDetails">Details</Button>
            <div class="button-container">
                <!-- Buttons for different actions -->
                <Button type="buy" @click="buyOrder">Buy</Button>
                <Button type="remove" @click="removeOrder">Remove</Button>
            </div>
        </div>

        <!-- Display the OrderPopUp component when showPopup is true -->
        <OrderPopUp v-if="showPopup" :order="order" @close="closePopup" />
    </div>
</template>

<style scoped>
.basket-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #000000;
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
    border-bottom: 2px solid #000000;
}

.basket-image-placeholder {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #999;
    font-size: 1rem;
    border-bottom: 2px solid #000000;
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

.button-container {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}
</style>
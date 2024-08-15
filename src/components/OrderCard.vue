<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import axios from 'axios';
import Button from './Button.vue';
import OrderPopUp from './OrderPopUp.vue'; // Import the OrderPopUp component

// Define the properties that the component will accept
const props = defineProps({
    order: {
        type: Object,
        required: true
    }
});

// Define emits to communicate with parent
const emit = defineEmits(['cancel-order']);

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

// Function to handle the cancellation of an order
const cancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Send DELETE request to cancel the order
            await axios.delete(`http://localhost:5000/api/v1/shoe/${props.order._id}`, {
                headers: {
                    'x-auth-token': token
                }
            });

            alert('Order has been canceled.');
            emit('cancel-order', props.order._id); // Emit the event to the parent component to update the UI
        } catch (error) {
            console.error('Failed to cancel order:', error.response ? error.response.data : error.message);
            alert('Failed to cancel the order. Please try again later.');
        }
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
    <div class="order-card">
        <!-- Display the image if available -->
        <img v-if="imageSrc" :src="imageSrc" alt="Order Item Image" class="order-image" />
        <div v-else class="order-image-placeholder">No Image Available</div>

        <!-- Display the order title and datetime -->
        <div class="order-info">
            <h3>{{ order.title }}</h3>
            <p>{{ order.datetime }}</p>

            <!-- Button to show the details popup -->
            <Button type="details" @click="showDetails">Details</Button>
            <div class="button-container">
                <!-- Button to cancel the order -->
                <Button type="remove" @click="cancelOrder">Cancel Order</Button>
            </div>
        </div>

        <!-- Display the OrderPopUp component when showPopup is true -->
        <OrderPopUp v-if="showPopup" :order="order" @close="closePopup" />
    </div>
</template>

<style scoped>
.order-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #000000;
    border-radius: 8px;
    overflow: hidden;
    padding: 1.5rem; /* Increased padding for more space */
    margin-bottom: 1.5rem; /* Increased margin for spacing */
    max-width: 400px; /* Increased max-width for larger cards */
    min-width: 300px; /* Minimum width to ensure cards are not too narrow */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Slightly larger shadow for better effect */
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.order-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2); /* Larger shadow on hover */
    transform: translateY(-5px);
}

.order-image {
    width: 100%;
    height: 250px; /* Increased height for larger images */
    object-fit: cover;
    border-bottom: 2px solid #000000;
}

.order-image-placeholder {
    width: 100%;
    height: 250px; /* Increased height for consistency */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #999;
    font-size: 1.2rem; /* Slightly larger font size */
    border-bottom: 2px solid #000000;
}

.order-info {
    padding: 1rem;
    text-align: center;
}

.order-info h3 {
    margin: 0;
    font-size: 1.5rem; /* Larger font size for better readability */
    color: #333;
}

.button-container {
    margin-top: 1rem; /* Increased margin for better spacing */
    display: flex;
    gap: 1rem; /* Increased gap for better button separation */
    justify-content: center;
}
</style>

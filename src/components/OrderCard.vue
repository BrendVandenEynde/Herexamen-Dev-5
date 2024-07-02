<script setup>
const order = {
    id: 1,
    image: 'https://placehold.co/500x250', // Placeholder image URL
    datetime: 'June 30, 2024 12:00 PM' // Example date and time
};

const showDetails = () => {
    // Implement function to show order details
};

const cancelOrder = () => {
    // Implement function to cancel order
};
</script>

<template>
    <div class="order-card">
        <img :src="order.image" alt="Order Image" class="order-image" />

        <div class="order-details">
            <p>{{ order.datetime }}</p>
            <div class="button-container">
                <button @click="showDetails">Details</button>
                <button @click="cancelOrder">Cancel Order</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.order-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    max-width: 300px;
    /* Adjust as needed */
}

.order-image {
    width: 100%;
    max-height: 200px;
    /* Adjust as needed */
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
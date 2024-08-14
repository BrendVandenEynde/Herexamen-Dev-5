<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/NavBar.vue';
import BasketCard from '../components/BasketCard.vue';
import axios from 'axios';

const basketItems = ref([]);
const error = ref(null);
const isLoading = ref(true); // Added loading state

// Function to fetch the basket items from the backend
const fetchBasketItems = async () => {
    isLoading.value = true; // Set loading to true before fetching
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Fetching basket items from the correct API endpoint
        const response = await axios.get('http://localhost:5000/api/v1/shoe/basket', {
            headers: {
                'x-auth-token': token
            }
        });

        // Update basketItems with the fetched data
        basketItems.value = response.data;

        // Handle empty basket
        if (basketItems.value.length === 0) {
            error.value = 'Your basket is currently empty.';
        } else {
            error.value = null; // Clear error if items are found
        }
    } catch (err) {
        console.error('Failed to fetch basket items:', err);
        if (err.response && err.response.status === 404) {
            // Handle 404 error specifically
            error.value = 'No basket items found.';
        } else {
            // Handle other errors
            error.value = 'Failed to fetch basket items. Please try again later.';
        }
        basketItems.value = [];
    } finally {
        isLoading.value = false; // Set loading to false after fetching
    }
};

// Function to handle the removal of an item from the basket
const handleRemoveItem = async (id) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Send delete request to remove the item
        await axios.delete(`http://localhost:5000/api/v1/shoe/basket/${id}`, {
            headers: {
                'x-auth-token': token
            }
        });

        // Filter out the removed item from basketItems
        basketItems.value = basketItems.value.filter(item => item._id !== id);

        // Handle empty basket after removal
        if (basketItems.value.length === 0) {
            error.value = 'Your basket is now empty.';
        }
    } catch (err) {
        console.error('Failed to remove item:', err);
        error.value = 'Failed to remove item. Please try again later.';
    }
};

// Fetch the basket items when the component is mounted
onMounted(() => {
    fetchBasketItems();
});
</script>

<template>
    <div class="basket-page">
        <Navbar />
        <h2>Basket Page</h2>
        <!-- Display loading state -->
        <div v-if="isLoading" class="loading-message">Loading your basket...</div>
        <!-- Display error message if there's an error -->
        <div v-if="error" class="error-message">{{ error }}</div>
        <!-- Display basket cards if there are items -->
        <div v-else>
            <div v-if="basketItems.length > 0" class="basket-cards">
                <BasketCard v-for="item in basketItems" :key="item._id" :order="item" @remove-item="handleRemoveItem" />
            </div>
            <div v-else class="no-items">No items in the basket</div>
        </div>
    </div>
</template>

<style scoped>
.basket-page {
    overflow-x: hidden;
    padding: 1rem;
    box-sizing: border-box;
}

.basket-cards {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    width: 100%;
    box-sizing: border-box;
}

.error-message,
.loading-message {
    color: red;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1rem;
}

.no-items {
    text-align: center;
    font-size: 1rem;
    color: #666;
}
</style>
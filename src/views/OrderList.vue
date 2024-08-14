<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/NavBar.vue';
import OrderCard from '../components/OrderCard.vue';
import axios from 'axios';

const orders = ref([]);
const isLoading = ref(true);
const isEmpty = ref(false);
const errorMessage = ref('');

// Fetch ordered items from the API
const fetchOrderedItems = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get('http://localhost:5000/api/v1/shoe/ordered', {
      headers: {
        'x-auth-token': token
      }
    });

    orders.value = response.data;
    isEmpty.value = orders.value.length === 0;
    if (isEmpty.value) {
      errorMessage.value = null; // Clear error message if no items found
    }
  } catch (error) {
    console.error('Error fetching ordered items:', error);
    if (error.response && error.response.status === 404) {
      // Handle 404 error specifically
      errorMessage.value = 'No orders found.';
    } else {
      // Handle other errors
      errorMessage.value = 'Failed to load orders. Please try again later.';
    }
    orders.value = [];
    isEmpty.value = true;
  } finally {
    isLoading.value = false;
  }
};

// Handle order cancellation
const handleCancelOrder = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    await axios.delete(`http://localhost:5000/api/v1/shoe/${orderId}`, {
      headers: {
        'x-auth-token': token
      }
    });

    // Filter out the canceled order from the list
    orders.value = orders.value.filter(order => order._id !== orderId);
    isEmpty.value = orders.value.length === 0;
  } catch (error) {
    console.error('Error cancelling order:', error);
    errorMessage.value = 'Failed to cancel the order. Please try again later.';
  }
};

// Fetch ordered items when component is mounted
onMounted(() => {
  fetchOrderedItems();
});
</script>

<template>
  <div class="order-list-container">
    <Navbar />
    <h2>Order List</h2>

    <div v-if="isLoading" class="loading-message">Loading...</div>

    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <div v-else-if="isEmpty" class="empty-message">No items have been ordered yet.</div>

    <div v-else class="order-cards">
      <OrderCard v-for="order in orders" :key="order._id" :order="order" @cancel-order="handleCancelOrder" />
    </div>
  </div>
</template>

<style scoped>
.order-list-container {
  max-width: 100vw;
  overflow-x: hidden;
  padding: 1rem;
  box-sizing: border-box;
}

.order-cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  width: 100%;
  box-sizing: border-box;
}

.loading-message,
.empty-message,
.error-message {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  margin-top: 2rem;
}

.error-message {
  color: #d9534f;
}
</style>
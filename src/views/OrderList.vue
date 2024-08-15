<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '../components/NavBar.vue';
import OrderCard from '../components/OrderCard.vue';
import axios from 'axios';

const orders = ref([]);
const isLoading = ref(true);
const isEmpty = ref(false);
const errorMessage = ref('');
let socket = null;

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
    errorMessage.value = isEmpty.value ? null : errorMessage.value; // Clear error message if items are found
  } catch (error) {
    console.error('Error fetching ordered items:', error);
    if (error.response && error.response.status === 404) {
      errorMessage.value = 'No orders found.';
    } else {
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

    alert('Order has been canceled.');
    fetchOrderedItems(); // Refresh the list immediately after canceling the order
  } catch (error) {
    console.error('Error cancelling order:', error);
    if (error.response && error.response.status === 404) {
      errorMessage.value = 'Order not found. It might have been already canceled.';
    } else {
      errorMessage.value = 'Failed to cancel the order. Please try again later.';
    }
  }
};

// Set up WebSocket connection
const setupWebSocket = () => {
  try {
    socket = new WebSocket('ws://localhost:5173/'); // Updated URL

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'orderUpdated' || message.type === 'orderCanceled') {
        fetchOrderedItems(); // Refresh the list on receiving update
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      errorMessage.value = 'WebSocket connection error. Please check your connection.';
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      if (!event.wasClean) {
        errorMessage.value = 'WebSocket connection closed unexpectedly. Reconnecting...';
        setTimeout(setupWebSocket, 3000); // Try to reconnect after 3 seconds
      }
    };
  } catch (error) {
    console.error('WebSocket setup error:', error);
    errorMessage.value = 'Failed to set up WebSocket connection.';
  }
};

// Clean up WebSocket connection
const cleanupWebSocket = () => {
  if (socket) {
    socket.close();
  }
};

// Fetch ordered items when component is mounted
onMounted(() => {
  fetchOrderedItems();
  setupWebSocket();
});

onUnmounted(() => {
  cleanupWebSocket();
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
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

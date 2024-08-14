<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/NavBar.vue';
import OrderCard from '../components/OrderCard.vue';
import axios from 'axios';

const orders = ref([]); // Use ref to make orders reactive
const isLoading = ref(true); // To show loading state
const isEmpty = ref(false); // To track if the list is empty

// Fetch ordered items from the API
const fetchOrderedItems = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/shoe/ordered', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    orders.value = response.data;

    // Check if the list is empty
    isEmpty.value = orders.value.length === 0;
  } catch (error) {
    console.error('Error fetching ordered items:', error);
  } finally {
    isLoading.value = false;
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

    <div v-else-if="isEmpty" class="empty-message">No items have been ordered yet.</div>

    <div v-else class="order-cards">
      <OrderCard v-for="order in orders" :key="order._id" :order="order" />
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
.empty-message {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  margin-top: 2rem;
}
</style>
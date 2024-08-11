<script setup>
import Navbar from '../components/NavBar.vue';
import OrderCard from '../components/OrderCard.vue';

// Mock orders data for demonstration
const orders = [
  { id: 1, image: 'https://placehold.co/500x250', datetime: 'June 30, 2024 12:00 PM' },
  { id: 2, image: 'https://placehold.co/500x250', datetime: 'July 1, 2024 3:00 PM' },
  // Add more orders as needed
];
</script>

<template>
  <div class="order-list-container">
    <Navbar />
    <h2>Order List</h2>
    <div class="order-cards">
      <OrderCard v-for="order in orders" :key="order.id" :order="order" />
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
</style>

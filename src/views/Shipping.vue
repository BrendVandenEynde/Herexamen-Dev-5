 <script setup>
  import { ref, onMounted } from 'vue';
  
  const unshippedItems = ref([]);
  const shippedItems = ref([]);
  
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/orders'); // Adjust the URL to your endpoint
      const data = await response.json();
      unshippedItems.value = data.filter(item => item.isOrdered === true);
      shippedItems.value = data.filter(item => item.isOrdered === false);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  onMounted(fetchOrders);
  </script>

<template>
    <div class="shipping-page">
      <h2>Order List</h2>
      <div class="lists">
        <div class="list">
          <h3>Unshipped</h3>
          <ul>
            <li v-for="item in unshippedItems" :key="item._id">
              {{ item.name }} - Ordered
            </li>
          </ul>
        </div>
        <div class="list">
          <h3>Shipped</h3>
          <ul>
            <li v-for="item in shippedItems" :key="item._id">
              {{ item.name }} - Shipped
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .shipping-page {
    padding: 20px;
  }
  
  .lists {
    display: flex;
    justify-content: space-between;
  }
  
  .list {
    width: 45%;
  }
  
  .list h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .list li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  </style>

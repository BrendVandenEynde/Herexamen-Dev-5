<script setup>
import Navbar from '../components/Navbar.vue';
import BasketCard from '../components/BasketCard.vue';

// Mock basket items for demonstration
const basketItems = [
    { id: 1, image: 'https://placehold.co/500x250', datetime: 'June 30, 2024 12:00 PM' },
    { id: 2, image: 'https://placehold.co/500x250', datetime: 'July 1, 2024 3:00 PM' }
];
</script>

<template>
    <div>
        <Navbar />
        <h2>Basket Page</h2>
        <div class="basket-cards">
            <BasketCard v-for="item in basketItems" :key="item.id" :order="item" />
        </div>
    </div>
</template>

<style scoped>
.basket-cards {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
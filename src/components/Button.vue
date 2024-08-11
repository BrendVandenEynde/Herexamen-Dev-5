<template>
  <button :class="computedClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['log-out', 'details', 'cancel', 'default', 'login', 'register'].includes(value)
  }
});

const computedClass = `btn-${props.type}`;

const handleClick = () => {
  // Handle button click actions as needed
};
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.btn-log-out {
  background-color: #dc3545;
  color: white;
}

.btn-details {
  background-color: #007bff;
  color: white;
}

.btn-cancel {
  background-color: #ff7f07;
  color: black;
}

.btn-default {
  background-color: #f0f0f0;
  color: black;
}

.btn-login {
  background-color: #28a745; 
  color: white;
}

.btn-register {
  background-color: #17a2b8;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>

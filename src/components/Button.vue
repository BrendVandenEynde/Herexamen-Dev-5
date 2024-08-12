<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => [
      'log-out', 
      'details', 
      'confirm', 
      'remove', 
      'cancel', 
      'default', 
      'login', 
      'register',
      'back-home',  // Added 'back-home'
      'confirm-config'  // Added 'confirm-config'
    ].includes(value)
  }
});

const computedClass = `btn-${props.type}`;

const handleClick = () => {
  // Handle button click actions as needed
};
</script>

<template>
  <button :class="computedClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
}

.btn-log-out, .btn-remove {
  background-color: #dc3545;
  color: white;
}

.btn-details {
  background-color: #007bff;
  color: white;
}

.btn-confirm {
  background-color: #28a745;
  color: white;
}

.btn-cancel {
  background-color: #ff7f07;
  color: white;
}

.btn-default {
  background-color: #f0f0f0;
  color: black;
}

.btn-login {
  background-color: #69FF47;
  color: white;
}

.btn-register {
  background-color: #000000;
  color: white;
}

.btn-back-home { 
  background-color: #555555;
  color: white;
}

.btn-confirm-config { 
  background-color: #0062cc;
  color: white;
}

button:hover {
  opacity: 0.8;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.5);
}
</style>
<script setup>
import Navbar from '../components/NavBar.vue';
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

const initializeThreeJs = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  camera.position.z = 5;

  const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
};

onMounted(() => {
  initializeThreeJs();
});
</script>

<template>
  <div>
    <Navbar />
    <h2>Shoe Configurator Page</h2>
    <!-- Add your shoe configurator functionality here -->
    <!-- Three.js will render the scene inside this div -->
    <div id="threejs-container"></div>
  </div>
</template>

<style scoped>
#threejs-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
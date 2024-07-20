<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Navbar from '../components/NavBar.vue';
import LeftMenu from '../components/LeftMenu.vue';
import MenuPopUp from '../components/MenuPopUp.vue';

const circles = ref([
  { id: 'laces', name: 'Laces' },
  { id: 'inside', name: 'Inside' },
  { id: 'outside_1', name: 'Outside 1' },
  { id: 'outside_2', name: 'Outside 2' },
  { id: 'sole_1', name: 'Sole 1' },
  { id: 'sole_2', name: 'Sole 2' },
  { id: 'options', name: 'Options' }
]);

const activeMenu = ref(null);
const shoeModel = ref(null);
const shoeSize = ref(42); // Default shoe size
const colorOptions = ref([
  '#FF0000', // Red
  '#000000', // Black
  '#3498DB', // Blue
  '#FFFFFF', // White
  '#2ECC71', // Green
  '#8E44AD', // Purple
  '#F1C40F', // Yellow
  '#E67E22', // Orange
  '#7F8C8D', // Dark Gray
  '#00008B', // dark blue
]); // Define color options

const toggleMenu = (circleId) => {
  activeMenu.value = activeMenu.value === circleId ? null : circleId;
};

const closeMenu = () => {
  activeMenu.value = null;
};

const selectColor = (part, color) => {
  console.log(`Selected color for ${part}:`, color);
  if (shoeModel.value) {
    shoeModel.value.traverse((child) => {
      if (child.isMesh && child.name === part) {
        child.material.color.set(color);
      }
    });
  }
  closeMenu(); // Close the menu after selecting a color
};

const initializeThreeJs = () => {
  const scene = new THREE.Scene();

  // Load skybox textures
  const loader = new THREE.CubeTextureLoader();
  const skyboxTexture = loader.load([
    '/cubemap/px.png', // Positive X
    '/cubemap/nx.png', // Negative X
    '/cubemap/py.png', // Positive Y
    '/cubemap/ny.png', // Negative Y
    '/cubemap/pz.png', // Positive Z
    '/cubemap/nz.png'  // Negative Z
  ]);
  scene.background = skyboxTexture;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('threejs-container').appendChild(renderer.domElement);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // Load GLB model
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('/models/shoe-optimized-arne.glb', (gltf) => {
    const model = gltf.scene;
    console.log('Model loaded:', model); // Log model information
    model.position.set(0, 1, 0); // Position the shoe model above the platform
    model.scale.set(1, 1, 1); // Adjust scale if necessary
    scene.add(model);

    // Assign the loaded model to the ref variable
    shoeModel.value = model;

    // Traverse the model to log names of all children
    model.traverse((child) => {
      if (child.isMesh) {
        console.log('Child name:', child.name);
      }
    });
  }, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
  });

  // Create a rounded square platform
  const platformGeometry = new THREE.ExtrudeGeometry(createRoundedSquare(1.5, 0.2), { depth: 0.2, bevelEnabled: false });
  const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
  const platform = new THREE.Mesh(platformGeometry, platformMaterial);
  platform.rotation.x = -Math.PI / 2; // Rotate the platform to be horizontal
  platform.position.y = -1; // Position the platform at ground level
  scene.add(platform);

  // Function to create a rounded square shape
  function createRoundedSquare(size, radius) {
    const shape = new THREE.Shape();
    shape.moveTo(-size + radius, -size);
    shape.lineTo(size - radius, -size);
    shape.quadraticCurveTo(size, -size, size, -size + radius);
    shape.lineTo(size, size - radius);
    shape.quadraticCurveTo(size, size, size - radius, size);
    shape.lineTo(-size + radius, size);
    shape.quadraticCurveTo(-size, size, -size, size - radius);
    shape.lineTo(-size, -size + radius);
    shape.quadraticCurveTo(-size, -size, -size + radius, -size);
    return shape;
  }

  // Add OrbitControls for camera
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable damping (inertia)
  controls.dampingFactor = 0.05; // Damping inertia factor
  controls.screenSpacePanning = false;
  controls.minDistance = 2; // Minimum distance to the model
  controls.maxDistance = 10; // Maximum distance to the model

  camera.position.z = 5;

  const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the shoe model
    if (shoeModel.value) {
      shoeModel.value.rotation.x += 0.01;
      shoeModel.value.rotation.y += 0.01;
    }

    controls.update(); // Update controls

    renderer.render(scene, camera);
  };

  animate();
};

onMounted(() => {
  initializeThreeJs();
});
</script>

<template>
  <div id="app-container">
    <Navbar />
    <!-- Three.js will render the scene inside this div -->
    <div id="threejs-container"></div>
    <!-- Left sidebar menu -->
    <LeftMenu :circles="circles" :activeMenu="activeMenu" @toggleMenu="toggleMenu" />
    <!-- Dynamic menu content -->
    <MenuPopUp v-if="activeMenu !== null" :activeMenu="activeMenu" @closeMenu="closeMenu" @selectColor="selectColor"
      :colorOptions="colorOptions" :shoeSize="shoeSize" @update:shoeSize="shoeSize = $event" />
  </div>
</template>

<style scoped>
#app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#threejs-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>

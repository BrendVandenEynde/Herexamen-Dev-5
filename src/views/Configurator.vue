<template>
    <div id="app-container">
      <Navbar class="navbar"/>
      <!-- Three.js will render the scene inside this div -->
      <div id="threejs-container"></div>
      <!-- Left navbar with circles -->
      <div class="left-navbar">
        <div
          v-for="circle in circles"
          :key="circle.id"
          class="circle"
          @click="toggleMenu(circle.id)"
          :class="{ active: circle.id === activeMenu }"
        >
          {{ circle.id }}
        </div>
      </div>
      <!-- Menu overlay -->
      <transition name="menu-slide">
        <div v-if="activeMenu !== null" class="menu-overlay">
          <div class="menu-content">
            <template v-if="activeMenu === 1">
              <h2>Select Color</h2>
              <div class="color-options">
                <div
                  v-for="color in colorOptions"
                  :key="color"
                  class="color-option"
                  :style="{ backgroundColor: color }"
                  @click="selectColor(color)"
                ></div>
              </div>
            </template>
            <template v-if="activeMenu === 2">
              <h2>Menu 2</h2>
              <p>Content for Menu 2.</p>
            </template>
            <!-- Add more templates for other menus as needed -->
            <button @click="closeMenu">Close</button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import Navbar from '../components/NavBar.vue';
  import { onMounted, ref } from 'vue';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  
  const circles = ref([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
  ]);
  const activeMenu = ref(null);
  
  const toggleMenu = (circleId) => {
    if (activeMenu.value === circleId) {
      closeMenu();
    } else {
      activeMenu.value = circleId;
    }
  };
  
  const closeMenu = () => {
    activeMenu.value = null;
  };
  
  const selectColor = (color) => {
    console.log('Selected color:', color);
    // Implement your logic here to apply the selected color to your 3D model or other components
    closeMenu();  // Close the menu after selecting a color
  };
  
  const initializeThreeJs = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xddffdd); // Set a light gray background color
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
  
    // Initialize variable for the shoe model
    const shoeModel = ref(null);
  
    // Load GLB model
    const loader = new GLTFLoader();
    loader.load('/models/shoe-optimized-arne.glb', (gltf) => {
      const model = gltf.scene;
      console.log('Model loaded:', model); // Log model information
      model.position.set(0, 1, 0); // Position the shoe model above the platform
      model.scale.set(1, 1, 1); // Adjust scale if necessary
      scene.add(model);
  
      // Assign the loaded model to the ref variable
      shoeModel.value = model;
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
  
  // Color options for the first menu (activeMenu === 1)
  const colorOptions = ref(['#FF5733', '#000000', '#3498DB', '#FFFFFF', '#2ECC71']);
  
  </script>
  
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
  
  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  .left-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 60px;
    height: 100%;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }
  
  .circle {
    width: 40px;
    height: 40px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .circle:hover {
    background-color: #ddd;
  }
  
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 600px; /* Width of the menu */
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: flex-end; /* Align content to the end */
    z-index: 4;
    overflow-x: hidden; /* Hide overflow */
    transition: width 0.3s ease; /* Smooth width transition */
  }
  
  .menu-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 450px;
    height: 900px;
  }
  
  .menu-slide-enter-active,
  .menu-slide-leave-active {
    transition: transform 0.3s;
  }
  
  .menu-slide-enter,
  .menu-slide-leave-to {
    transform: translateX(-100%);
  }
  
  .color-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  
  .color-option {
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .color-option:hover {
    transform: scale(1.1);
  }
  </style>
  
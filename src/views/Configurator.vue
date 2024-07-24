<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Navbar from '../components/NavBar.vue';
import LeftMenu from '../components/LeftMenu.vue';
import MenuPopUp from '../components/MenuPopUp.vue';

// Define the circles for the menu items
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

// Define color options
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
  '#00008B', // Dark Blue
]);

// Define material options
const materialOptions = ref([
  {
    name: 'Stylized Scales',
    textures: {
      ao: '/textures/scales/Stylized_Scales_003_ambientOcclusion.png',
      base: '/textures/scales/Stylized_Scales_003_basecolor.png',
      normal: '/textures/scales/Stylized_Scales_003_normal.png',
      roughness: '/textures/scales/Stylized_Scales_003_roughness.png'
    }
  },
  {
    name: 'Fabric Lace',
    textures: {
      ao: '/textures/leopard/Fabric_Lace_038_ambientOcclusion.png',
      base: '/textures/leopard/Fabric_Lace_038_basecolor.png',
      normal: '/textures/leopard/Fabric_Lace_038_normal.png',
      roughness: '/textures/leopard/Fabric_Lace_038_roughness.png',
      opacity: '/textures/leopard/Fabric_Lace_038_opacity.png'
    }
  },
  {
    name: 'Tropic Lace',
    textures: {
      ao: '/textures/tropic/Fabric_Lace_036_ambientOcclusion.png',
      base: '/textures/tropic/Fabric_Lace_036_basecolor.png',
      normal: '/textures/tropic/Fabric_Lace_036_normal.png',
      roughness: '/textures/tropic/Fabric_Lace_036_roughness.png',
      opacity: '/textures/tropic/Fabric_Lace_036_opacity.png'
    }
  },
  {
    name: 'Military',
    textures: {
      ao: '/textures/military/Fabric_Mesh_Military_001_ambientOcclusion.jpg',
      base: '/textures/military/Fabric_Mesh_Military_001_basecolor.jpg',
      normal: '/textures/military/Fabric_Mesh_Military_001_normal.jpg',
      opacity: '/textures/military/Fabric_Mesh_Military_001_opacity.jpg',
      roughness: '/textures/military/Fabric_Mesh_Military_001_roughness.jpg'
    }
  },
  {
    name: 'Hexagon Fabric',
    textures: {
      ao: '/textures/hexagon/Fabric_026_ambientOcclusion.jpg',
      base: '/textures/hexagon/Fabric_026_basecolor.jpg',
      normal: '/textures/hexagon/Fabric_026_normal.jpg',
      roughness: '/textures/hexagon/Fabric_026_roughness.jpg'
    }
  }
]);

const toggleMenu = (circleId) => {
  activeMenu.value = activeMenu.value === circleId ? null : circleId;
};

const closeMenu = () => {
  activeMenu.value = null;
};

// Function to select color for a part
const selectColor = (part, color) => {
  console.log(`Selected color for ${part}:`, color);
  if (shoeModel.value) {
    shoeModel.value.traverse((child) => {
      if (child.isMesh && child.name === part) {
        child.material.color.set(color);
      }
    });
  }
  closeMenu();
};

// Function to select material for a part
const selectMaterial = (part, materialTextures) => {
  if (!materialTextures) {
    console.error(`Material textures for ${part} are undefined`);
    return;
  }

  console.log(`Selected material for ${part}:`, materialTextures);
  if (shoeModel.value) {
    const textureLoader = new THREE.TextureLoader();

    // Load textures conditionally based on the material options
    const textures = {};
    if (materialTextures.ao) textures.aoMap = textureLoader.load(materialTextures.ao);
    if (materialTextures.base) textures.map = textureLoader.load(materialTextures.base);
    if (materialTextures.normal) textures.normalMap = textureLoader.load(materialTextures.normal);
    if (materialTextures.roughness) textures.roughnessMap = textureLoader.load(materialTextures.roughness);
    if (materialTextures.opacity) textures.opacityMap = textureLoader.load(materialTextures.opacity);
    if (materialTextures.height) textures.displacementMap = textureLoader.load(materialTextures.height);

    shoeModel.value.traverse((child) => {
      if (child.isMesh && child.name === part) {
        Object.assign(child.material, textures);
        child.material.needsUpdate = true;
      }
    });
  }
  closeMenu();
};

// Initialize Three.js scene
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
    console.log('Model loaded:', model);
    model.position.set(0, 1, 0);
    model.scale.set(1, 1, 1);
    scene.add(model);

    shoeModel.value = model;

    // Traverse model to log child names
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
  platform.rotation.x = -Math.PI / 2;
  platform.position.y = -1;
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
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 2;
  controls.maxDistance = 10;

  camera.position.z = 5;

  const animate = function () {
    requestAnimationFrame(animate);

    if (shoeModel.value) {
      shoeModel.value.rotation.x += 0.01;
      shoeModel.value.rotation.y += 0.01;
    }

    controls.update();

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
    <div id="threejs-container"></div>
    <LeftMenu :circles="circles" :activeMenu="activeMenu" @toggleMenu="toggleMenu" />
    <MenuPopUp v-if="activeMenu !== null" :activeMenu="activeMenu" @closeMenu="closeMenu" @selectColor="selectColor"
      @selectMaterial="selectMaterial" :colorOptions="colorOptions" :materialOptions="materialOptions" />
  </div>
</template>

<style scoped>
#app-container {
  display: flex;
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

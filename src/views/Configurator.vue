<script setup>
import Navbar from '../components/NavBar.vue';
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

    // Create a square platform
    const platformGeometry = new THREE.BoxGeometry(3, 0.1, 3); // Make the platform larger and thin
    const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = 0; // Position the platform at ground level
    scene.add(platform);

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
        <Navbar class="navbar"/>
        <!-- Add your shoe configurator functionality here -->
        <!-- Three.js will render the scene inside this div -->
        <div id="threejs-container"></div>
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

.navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8);
}

.page-title {
    position: relative;
    z-index: 2;
    margin-top: 70px;
    padding: 20px;
}
</style>

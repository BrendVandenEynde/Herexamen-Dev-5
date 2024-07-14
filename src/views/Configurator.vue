<script setup>
import Navbar from '../components/NavBar.vue';
import { onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const initializeThreeJs = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xddffdd); // Set a light gray background color
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-container').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // add cube to scene
    scene.add(cube);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load('/models/shoe-optimized-arne.glb', (gltf) => {
        const model = gltf.scene;
        console.log('Model loaded:', model); // Log model information
        model.position.set(2, 0, 0); // Position it next to the cube
        model.scale.set(0.5, 0.5, 0.5); // Adjust scale if necessary
        scene.add(model);
    }, undefined, (error) => {
        console.error('An error occurred while loading the model:', error);
    });

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
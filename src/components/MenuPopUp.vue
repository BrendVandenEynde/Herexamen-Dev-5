<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';

// Define props
const props = defineProps({
    activeMenu: {
        type: String,
        default: null
    },
    colorOptions: {
        type: Array,
        required: true
    },
    materialOptions: {
        type: Array,
        required: true
    },
    shoeSize: {
        type: Number,
        default: 42
    }
});

const emits = defineEmits(['closeMenu', 'selectColor', 'selectMaterial', 'update:shoeSize']);

// Define size limits
const MIN_EU_SIZE = 35; // Minimum EU size
const MAX_EU_SIZE = 50; // Maximum EU size

const euroSize = ref(props.shoeSize);

// Compute US and UK sizes based on the input EU size
const usSize = computed(() => convertEuroToUS(euroSize.value));
const ukSize = computed(() => convertEuroToUK(euroSize.value));

// Conversion functions
const convertEuroToUS = (euroSize) => (euroSize - 33) * 1.5 + 4;
const convertEuroToUK = (euroSize) => euroSize - 33;

// Update size function with limits
const updateShoeSize = (event) => {
    let newSize = Number(event.target.value);
    if (newSize < MIN_EU_SIZE) {
        newSize = MIN_EU_SIZE;
    } else if (newSize > MAX_EU_SIZE) {
        newSize = MAX_EU_SIZE;
    }
    euroSize.value = newSize;
    emits('update:shoeSize', newSize);
};

// Emit closeMenu event
const closeMenu = () => {
    emits('closeMenu');
};

// Emit selectColor event
const selectColor = (color) => {
    emits('selectColor', props.activeMenu, color);
};

// Emit selectMaterial event
const selectMaterial = (materialName) => {
    const selectedMaterial = props.materialOptions.find(m => m.name === materialName);
    if (selectedMaterial) {
        console.log(`Selected material: ${materialName}`, selectedMaterial.textures);
        emits('selectMaterial', props.activeMenu, selectedMaterial.textures);
    } else {
        console.error(`Material ${materialName} not found`);
    }
};
</script>

<template>
    <transition name="menu-slide">
        <div v-if="activeMenu !== null" class="menu-overlay" @click="closeMenu">
            <div class="menu-content" @click.stop>
                <!-- Laces -->
                <template v-if="activeMenu === 'laces'">
                    <h2>Select Color for {{ activeMenu }}</h2>
                    <div class="color-options">
                        <div v-for="color in colorOptions" :key="color" class="color-option"
                            :style="{ backgroundColor: color }" @click="selectColor(color)"></div>
                    </div>
                </template>

                <!-- Inside, Upper Exterior, Outside-1, Midsoule, Sole_1, Sole_2, Outsoule -->
                <template
                    v-else-if="['inside', 'outside_1', 'upper_exterior', 'midsoule', 'sole_1', 'sole_2', 'outsoule'].includes(activeMenu)">
                    <h2>Select {{ ['inside', 'upper_exterior'].includes(activeMenu) ? 'Color and Material' : 'Material'
                        }} for {{ activeMenu }}</h2>
                    <div class="color-options">
                        <div v-for="color in colorOptions" :key="color" class="color-option"
                            :style="{ backgroundColor: color }" @click="selectColor(color)"></div>
                    </div>
                    <div class="material-options">
                        <div v-for="material in materialOptions" :key="material.name" class="material-option"
                            @click="selectMaterial(material.name)">
                            {{ material.name }}
                        </div>
                    </div>
                </template>

                <!-- Options -->
                <template v-else-if="activeMenu === 'options'">
                    <h2>Options</h2>
                    <div class="size-options">
                        <label for="euro-size">EU Size:</label>
                        <input type="number" id="euro-size" :value="euroSize" @input="updateShoeSize"
                            placeholder="EU Size" :min="MIN_EU_SIZE" :max="MAX_EU_SIZE" />
                        <p>US Size: {{ usSize.toFixed(1) }}</p>
                        <p>UK Size: {{ ukSize.toFixed(1) }}</p>
                    </div>
                </template>

                <button @click="closeMenu">Close</button>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 4;
    overflow-x: hidden;
    transition: width 0.3s ease;
}

.menu-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: 100%;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
    transition: transform 0.3s;
}

.menu-slide-enter,
.menu-slide-leave-to {
    transform: translateX(-100%);
}

.color-options,
.material-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
}

.color-option,
.material-option {
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.color-option:hover,
.material-option:hover {
    transform: scale(1.1);
}

.size-options {
    margin-top: 20px;
}

.size-options label {
    display: block;
    margin-bottom: 5px;
}

.size-options input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
}

.size-options p {
    margin: 5px 0;
}
</style>

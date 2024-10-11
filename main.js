// Import necessary modules from Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as lil from 'lil-gui';
// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-100, 27, -36.8);



// Set up the renderer
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas,antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);


// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Load HDRI environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/kloppenheim_02_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    // scene.background = texture;
});

// Instantiate GLTFLoader
const gltfLoader = new GLTFLoader();

// Load GLTF model
gltfLoader.load('./eiffel_tower.glb', function (gltf) {
    gltf.scene.position.set(10, 0, 0);
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error('An error happened while loading the GLTF model:', error);
});

// Set up lil-gui
// const gui = new lil.GUI();

// const cameraFolder = gui.addFolder('Camera');
// cameraFolder.add(camera.position, 'x', -100, 100).name('Position X');
// cameraFolder.add(camera.position, 'y', -100, 100).name('Position Y');
// cameraFolder.add(camera.position, 'z', -100, 100).name('Position Z');
// cameraFolder.open();

// const controlsFolder = gui.addFolder('Controls');
// controlsFolder.add(controls, 'enableDamping').name('Enable Damping');
// controlsFolder.add(controls, 'dampingFactor', 0, 1).name('Damping Factor');
// controlsFolder.add(controls, 'screenSpacePanning').name('Screen Space Panning');
// controlsFolder.add(controls, 'maxPolarAngle', 0, Math.PI).name('Max Polar Angle');
// controlsFolder.open();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


//orbit controls

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



//lighting 


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const helper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(helper);

const pointLight = new THREE.PointLight(0xffffff, 0.3, 10, 2);
pointLight.position.set(1, -1.2, 1);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight,-1);
scene.add(pointLightHelper);



//texture loading 

let loader = new THREE.TextureLoader();

let color = loader.load("./text/color.jpg");
let roughness = loader.load("./text/roughness.jpg");
let normal = loader.load("./text/normal.jpg");

//geometry construction


// const geometry = new THREE.SphereGeometry(2, 5, 5,1);
// const geometry = new THREE.CylinderGeometry(2,2,2,10,10,true);

const geometry = new THREE.BoxGeometry(3,1.8,2,100,100);
// const material = new THREE.MeshBasicMaterial( { color: "red",wireframe: false} );

//side: THREE.DoubleSide //in above line ,shows the inside also for cylinder


//material construction

const material = new THREE.MeshStandardMaterial( { map: color, roughnessMap: roughness,normalMap: normal} );

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize', () =>{
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})


const gui = new lil.GUI();

const lightFolder = gui.addFolder('Lights');

// Ambient Light
scene.add(ambientLight);
const ambientLightFolder = lightFolder.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity', 0, 1).name('Intensity');
ambientLightFolder.open();

// Directional Light
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
const directionalLightFolder = lightFolder.addFolder('Directional Light');
directionalLightFolder.add(directionalLight, 'intensity', 0, 1).name('Intensity');
directionalLightFolder.add(directionalLight.position, 'x', -10, 10).name('Position X');
directionalLightFolder.add(directionalLight.position, 'y', -10, 10).name('Position Y');
directionalLightFolder.add(directionalLight.position, 'z', -10, 10).name('Position Z');
directionalLightFolder.open();

// Point Light
const pointLightFolder = lightFolder.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 1).name('Intensity');
pointLightFolder.add(pointLight.position, 'x', -10, 10).name('Position X');
pointLightFolder.add(pointLight.position, 'y', -10, 10).name('Position Y');
pointLightFolder.add(pointLight.position, 'z', -10, 10).name('Position Z');
pointLightFolder.open();

lightFolder.close();

const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1).name('Roughness');
materialFolder.add(material, 'metalness', 0, 1).name('Metalness');
materialFolder.add(material, 'wireframe').name('Wireframe');
materialFolder.addColor(material, 'color').name('Color');
materialFolder.close();

const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotation X');
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('Rotation Z');
meshFolder.add(cube.position, 'x', -10, 10).name('Position X');
meshFolder.add(cube.position, 'y', -10, 10).name('Position Y');
meshFolder.add(cube.position, 'z', -10, 10).name('Position Z');
meshFolder.add(cube.scale, 'x', 0, 3).name('Scale X');
meshFolder.add(cube.scale, 'y', 0, 3).name('Scale Y');
meshFolder.add(cube.scale, 'z', 0, 3).name('Scale Z');
meshFolder.close();


const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.autoRotate = false;
controls.enableZoom = true;
controls.dampingFactor = 0.1; // when using mouse will rotate faster

function animate() {
    window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();
}
animate();

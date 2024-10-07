// Import styles
import './style.css';

// Import necessary modules from three.js
import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 15);

// Set up renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Add a sphere to the scene
const geometry = new THREE.TorusGeometry(10, 3, 16,100);
const material = new THREE.MeshStandardMaterial({ color: 0xc0c0c0











 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add a point light to the scene
const pointLight = new THREE.PointLight(0xffffff,200)
pointLight.position.set(10, 10, 10)
pointLight.distance = 100;
scene.add(pointLight)
// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.04); // Adjust intensity to be very faint
scene.add(ambientLight);


const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)
const controls = new OrbitControls(camera,renderer.domElement);

function addStar() {
const geometry = new THREE.SphereGeometry(0.25,24,24);
const material = new THREE.MeshStandardMaterial({color: 0xffffff})
const star = new THREE.Mesh(geometry,material);
const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
star.position.set(x,y,z);
scene.add(star)
}
Array(400).fill().forEach(addStar)

const SpaceTexture = new THREE.TextureLoader().load('stars.jpg');
// Add ambient light to the scene



// Function to handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = 15 + t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;




// Animate function
function animate() {
    requestAnimationFrame(animate);

    // Rotate the sphere
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

// Event listener for window resizing
window.addEventListener('resize', onWindowResize, false);

// Start animation
animate();

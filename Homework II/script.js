// Import Three.js libraries
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

// Classroom walls 
const classroomGeometry = new THREE.BoxGeometry(10, 5, 10);
const classroomMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xcccccc }), // Left wall with windows
    new THREE.MeshBasicMaterial({ color: 0xcccccc }), // Right wall
    new THREE.MeshBasicMaterial({ color: 0xeeeeee }), // Ceiling
    new THREE.MeshBasicMaterial({ color: 0x888888 }), // Floor
    new THREE.MeshBasicMaterial({ color: 0xcccccc }), // Back wall
    new THREE.MeshBasicMaterial({ color: 0xcccccc }), // Front wall
];
const classroom = new THREE.Mesh(classroomGeometry, classroomMaterials);
classroom.material.forEach(mat => mat.side = THREE.BackSide);
scene.add(classroom);


const windowTexture = new THREE.TextureLoader().load('textures/grass.jpg');

// First window
const window1Geometry = new THREE.PlaneGeometry(1.7, 2);
const window1Material = new THREE.MeshBasicMaterial({ map: windowTexture });
const window1 = new THREE.Mesh(window1Geometry, window1Material);
window1.position.set(-4.9, 0, -2);
window1.rotation.y = Math.PI / 2;
scene.add(window1);

// Second window
const window2Geometry = new THREE.PlaneGeometry(1.7, 2);
const window2Material = new THREE.MeshBasicMaterial({ map: windowTexture });
const window2 = new THREE.Mesh(window2Geometry, window2Material);
window2.position.set(-4.9, 0, 2);
window2.rotation.y = Math.PI / 2;
scene.add(window2);

// blackboard on the front wall
const blackboardGeometry = new THREE.PlaneGeometry(6, 2);
const blackboardMaterial = new THREE.MeshBasicMaterial({ color: 0x228b22 });
const blackboard = new THREE.Mesh(blackboardGeometry, blackboardMaterial);
blackboard.position.set(0, 0, -4.9);
scene.add(blackboard);


// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(0, 4.5, 0);
scene.add(pointLight);

// Load desks and chairs
const loader = new GLTFLoader();
loader.load('models/desk_chair.glb', (gltf) => {
    const deskAndChair = gltf.scene;
    deskAndChair.scale.set(0.2, 0.2, 0.2);

    // positions for 6 pairs of desks and chairs
    const pairs = [
        { x: 5, z: -10 },
        { x: 8, z: -10 },
        { x: 8, z: -7 },
        { x: 5, z: -7 },
        { x: 5, z: -4.6 },
        { x: 8, z: -4.6 },
    ];

    pairs.forEach((pair) => {
        const deskClone = deskAndChair.clone();
        deskClone.position.set(pair.x, -2.6, pair.z);
        deskClone.rotation.y = -55;
        scene.add(deskClone);
    });



// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

})
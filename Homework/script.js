import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 10, 20);
controls.update();

const grassMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
const roadMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });

// Grass
const grass = new THREE.Mesh(new THREE.PlaneGeometry(30, 36), grassMaterial);
grass.rotation.x = -Math.PI / 2;
scene.add(grass);

// Roads 
const road1 = new THREE.Mesh(new THREE.PlaneGeometry(30, 2), roadMaterial);
road1.rotation.x = -Math.PI / 2;
road1.position.set(0, 0.01, -2);
scene.add(road1);

const road2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 36), roadMaterial);
road2.rotation.x = -Math.PI / 2;
road2.position.set(-2, 0.01, 0);
scene.add(road2);

// Roundabout
const roundaboutMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });
const roundabout = new THREE.Mesh(new THREE.CircleGeometry(3, 32), roundaboutMaterial);
roundabout.rotation.x = -Math.PI / 2;
roundabout.position.set(-2, 0.02, -2);
scene.add(roundabout);

// Front building
const frontBuildingMaterial = new THREE.MeshBasicMaterial({ color: '#42adf5' });
const frontBuilding = new THREE.Mesh(new THREE.BoxGeometry(10, 3, 5), frontBuildingMaterial);
frontBuilding.position.set(-9, 1.5, 5);
frontBuilding.rotation.y = Math.PI / -6;
scene.add(frontBuilding);

// Side Buildings
const sideBuildingMaterial1 = new THREE.MeshBasicMaterial({ color: '#42adf5' });
const sideBuilding1 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 11), sideBuildingMaterial1);
sideBuilding1.position.set(-8, 1.5, -12); 
scene.add(sideBuilding1);

const sideBuildingMaterial2 = new THREE.MeshBasicMaterial({ color: 'white' });
const sideBuilding2 = new THREE.Mesh(new THREE.BoxGeometry(5, 3, 9), sideBuildingMaterial2);
sideBuilding2.position.set(5, 1.5, 6);
scene.add(sideBuilding2);

// Animated Sphere
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), sphereMaterial);
sphere.position.set(-2 + 3, 0.5, -2);
scene.add(sphere);

// Animate Sphere in a Circular Path
gsap.to(sphere.position, {
  duration: 5,
  repeat: -1,
  ease: "none",
  onUpdate: function () {
    const angle = this.progress() * Math.PI * 2;
    sphere.position.x = -2 + Math.cos(angle) * 3;
    sphere.position.z = -2 + Math.sin(angle) * 3;
  }
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

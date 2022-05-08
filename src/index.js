'use strict';

import movements from './movements.js';

const cameraMovementSpeed = 1.5;

//*Declaration of a new scene with Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00222f); //!All colors need to start with 0x

//* Camera and renderer configuration
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//*Creating a simple plane
const planeGeometry = new THREE.BoxGeometry(100, 0.2, 50);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x0fffba });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(plane);

//*Creating simple geometry: Cube
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 1;

scene.add(cube);

//*Creating simple geometry: Cone

const coneGeometry = new THREE.ConeGeometry();
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);

cone.position.x = 10;
cone.position.y = 1;

scene.add(cone);

camera.position.set(10, 5, 40);

//*Creating lighting
const ambientLighting = new THREE.AmbientLight(0xbda355);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
ambientLighting.add(directionalLight);
scene.add(ambientLighting);

const animate = function () {
  ambientLighting.rotation.z += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z -= 0.01;
  cone.rotation.y -= 0.01;
  cone.rotation.z += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  //*Camera Movements
  //Movement to the left
  if (movements.isPressed(37)) camera.position.x -= cameraMovementSpeed;
  //Upward movement
  if (movements.isPressed(38)) camera.position.y += cameraMovementSpeed;
  //Movement to the left
  if (movements.isPressed(39)) camera.position.x += cameraMovementSpeed;
  //Downward movement
  if (movements.isPressed(40)) camera.position.y -= cameraMovementSpeed;

  camera.lookAt(plane.position);
};

animate();

// renderer.render(scene, camera);

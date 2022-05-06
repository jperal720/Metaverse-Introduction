'use strict';

const hello = 'hello World';

console.log('hello:', hello);

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

renderer.render(scene, camera);

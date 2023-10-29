import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const useSceneInitializer = (containerRef, scene, camera, rendererRef) => {
  camera.position.set(4, 3, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (containerRef.current) {
    containerRef.current.appendChild(renderer.domElement);
  }

  rendererRef.current = renderer; // Store the renderer in the ref

  const controls = new OrbitControls(camera, renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  // Create a simple cube and add it to the scene
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
};

export default useSceneInitializer;

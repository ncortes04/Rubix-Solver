import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TWEEN from "tween.js";

const cubeContainer = new THREE.Group();

const bottomLayerGroup = new THREE.Group(); // Create a group for the bottom layer
const middleLayerGroup = new THREE.Group(); // Create a group for the middle layer
const topLayerGroup = new THREE.Group(); // Create a group for the top layer\

// Define a hashmap for colors
// Define a function to rotate the right side of the cube
function rotateRightSide(cubeContainer, duration) {
  const targetRotation = Math.PI / 2; // Rotate 90 degrees
  const cubelets = cubeContainer.children;

  // Create a tween animation for each cubelet
  cubelets.forEach((cubelet) => {
    const currentRotation = cubelet.rotation.y;
    const rotationTween = new TWEEN.Tween({ rotation: currentRotation })
      .to({ rotation: currentRotation + targetRotation }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function () {
        cubelet.rotation.y = this.rotation;
      })
      .start();
  });
}

const colorMap = {
  r: 0xff0000, // Red
  g: 0x00ff00, // Green
  b: 0x0000ff, // Blue
  w: 0xffffff, // White
  y: 0xffff00, // Yellow
  o: 0xffa500, // Orange
};

function handleCubeletSides(x, y, left, right, front, back) {
  let materials = Array(6)
    .fill()
    .map(
      (_, index) => new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initialize with white color
    );
  switch (`${x}-${y}`) {
    case "0-0": // Bottom Left
      // Handle materials for the bottom left cubelet
      materials[5].color.set(colorMap[left[2]]); // Set the color to red (hex value)
      materials[1].color.set(colorMap[front[0]]); // Set the color to red (hex value)
      break;
    case "0-1": // Bottom Middle
      // Handle materials for the bottom middle cubelet
      materials[1].color.set(colorMap[front[1]]); // Set the color to red (hex value)
      break;
    case "0-2": // Bottom Right
      // Handle materials for the bottom right cubelet
      materials[4].color.set(colorMap[right[0]]); // Set the color to red (hex value)
      materials[1].color.set(colorMap[front[2]]); // Set the color to red (hex value)
      break;
    case "1-0": // Middle Left
      // Handle materials for the middle left cubelet
      materials[5].color.set(colorMap[left[1]]); // Set the color to red (hex value)
      break;
    case "1-2": // Middle Right
      // Handle materials for the middle right cubelet
      materials[4].color.set(colorMap[right[1]]); // Set the color to red (hex value)
      break;
    case "2-0": // Top Left
      // Handle materials for the top left cubelet
      materials[5].color.set(colorMap[left[0]]); // Set the color to red (hex value)
      materials[0].color.set(colorMap[back[2]]); // Set the color to red (hex value)
      break;
    case "2-1": // Top Middle
      // Handle materials for the top middle cubelet
      materials[0].color.set(colorMap[back[1]]); // Set the color to red (hex value)
      break;
    case "2-2": // Top Right
      // Handle materials for the top right cubelet
      materials[4].color.set(colorMap[right[2]]); // Set the color to red (hex value)
      materials[0].color.set(colorMap[back[0]]); // Set the color to red (hex value)
      break;
    default:
    // Handle materials for other cubelets (if needed)
  }
  return materials;
}

// Usage in generateBottomLayer function
function generateBottomLayer(container, bottom, left, right, front, back) {
  const cubeSize = 1;
  const cubeSpacing = 0.02; // Adjust the spacing

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const colorMaterial = handleCubeletSides(x, y, left, right, front, back);
      colorMaterial[3].color.set(colorMap[bottom[2 - x][y]]);

      const cubeletGeometry = new THREE.BoxGeometry(
        cubeSize,
        cubeSize,
        cubeSize
      );
      const cubeletMesh = new THREE.Mesh(cubeletGeometry, colorMaterial);
      cubeletMesh.position.set(
        parseFloat((x * (cubeSize + cubeSpacing) - 1).toFixed(6)),
        parseFloat((-cubeSize - 0.02).toFixed(6)),
        parseFloat((y * (cubeSize + cubeSpacing) - 1).toFixed(6))
      );

      bottomLayerGroup.add(cubeletMesh); // Add cubelet to the bottom layer group
    }
  }

  container.add(bottomLayerGroup); // Add the bottom layer group to the container
}

function generateTopLayer(container, top, left, right, front, back) {
  const cubeSize = 1;
  const cubeSpacing = 0.02; // Adjust the spacing

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const colorMaterial = handleCubeletSides(x, y, left, right, front, back);

      // Set the color of the top face
      colorMaterial[2].color.set(colorMap[top[x][y]]);

      const cubeletGeometry = new THREE.BoxGeometry(
        cubeSize,
        cubeSize,
        cubeSize
      );
      const cubeletMesh = new THREE.Mesh(cubeletGeometry, colorMaterial);
      cubeletMesh.position.set(
        parseFloat((x * (cubeSize + cubeSpacing) - 1).toFixed(6)),
        parseFloat((cubeSize + 0.02).toFixed(6)),
        parseFloat((y * (cubeSize + cubeSpacing) - 1).toFixed(6))
      );

      topLayerGroup.add(cubeletMesh); // Add cubelet to the top layer group
    }
  }

  container.add(topLayerGroup); // Add the top layer group to the container
}

function generateMiddleLayer(container, left, right, front, back) {
  const cubeSize = 1;
  const cubeSpacing = 0.02; // Adjust the spacing

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const colorMaterial = handleCubeletSides(x, y, left, right, front, back);

      // For the middle layer, you don't need to set the bottom color
      // colorMaterial[3].color.set(colorMap[bottom[2 - x][y]]);

      const cubeletGeometry = new THREE.BoxGeometry(
        cubeSize,
        cubeSize,
        cubeSize
      );
      const cubeletMesh = new THREE.Mesh(cubeletGeometry, colorMaterial);
      cubeletMesh.position.set(
        parseFloat((x * (cubeSize + cubeSpacing) - 1).toFixed(6)),
        0,
        parseFloat((y * (cubeSize + cubeSpacing) - 1).toFixed(6))
      );

      middleLayerGroup.add(cubeletMesh); // Add cubelet to the middle layer group
    }
  }

  container.add(middleLayerGroup); // Add the middle layer group to the container
}

function RubiksCube() {
  const containerRef = useRef(null);
  const [animating, setAnimating] = useState(false);
  const scene = new THREE.Scene();

  const animatingRef = useRef(false); // Use a ref to store animating state

  function performAnimation(targetGroup, reversed = false) {
    if (animating) {
      return;
    }
    setAnimating(true);
    const rotationDuration = 1000; // Duration in milliseconds
    const targetRotationY = reversed
      ? targetGroup.rotation.y + Math.PI / 2 // Rotate backward by 90 degrees
      : targetGroup.rotation.y - Math.PI / 2; // Rotate forward by 90 degrees
    new TWEEN.Tween(targetGroup.rotation)
      .to({ y: targetRotationY }, rotationDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => {
        setAnimating(false);
      })
      .start();
  }
  useLayoutEffect(() => {
    // Create a container to hold the cubelets and set its position to the center
    cubeContainer.position.set(0, 0, 0); // Centered position
    cubeContainer.rotation.y = Math.PI / 1.4; // Rotate 45 degrees around the X-axis
    scene.add(cubeContainer);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    window.addEventListener("resize", () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    const bottomFace = [
      ["w", "w", "w"],
      ["w", "w", "w"],
      ["w", "w", "w"],
    ];

    const leftFace = [
      ["g", "g", "g"],
      ["g", "g", "g"],
      ["g", "g", "g"],
    ];

    const rightFace = [
      ["b", "b", "b"],
      ["b", "b", "b"],
      ["b", "r", "b"],
    ];

    const frontFace = [
      ["o", "o", "o"],
      ["o", "o", "o"],
      ["o", "o", "o"],
    ];

    const backFace = [
      ["r", "r", "r"],
      ["r", "r", "r"],
      ["r", "r", "r"],
    ];
    const topFace = [
      ["y", "y", "y"],
      ["y", "y", "y"],
      ["y", "y", "y"],
    ];

    generateBottomLayer(
      cubeContainer,
      bottomFace,
      leftFace[2],
      rightFace[2],
      frontFace[2],
      backFace[2]
    );
    generateMiddleLayer(
      cubeContainer,
      leftFace[1],
      rightFace[1],
      frontFace[1],
      backFace[1]
    );
    generateTopLayer(
      cubeContainer,
      topFace,
      leftFace[0],
      rightFace[0],
      frontFace[0],
      backFace[0]
    );

    // Render function to create and animate the scene
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      TWEEN.update(); // Update Tween.js animations
    };

    animate();
  }, []);

  return (
    <>
      <div ref={containerRef} />
      <>
        <div ref={containerRef} />
        <button onClick={() => performAnimation(bottomLayerGroup)}>
          Rotate Bottom Layer
        </button>
        <button onClick={() => performAnimation(bottomLayerGroup, true)}>
          Rotate Bottom Layer Backward
        </button>
        <button onClick={() => performAnimation(middleLayerGroup)}>
          Rotate Middle Layer
        </button>
        <button onClick={() => performAnimation(middleLayerGroup, true)}>
          Rotate Middle Layer Backward
        </button>
        <button onClick={() => performAnimation(topLayerGroup)}>
          Rotate Top Layer
        </button>
        <button onClick={() => performAnimation(topLayerGroup, true)}>
          Rotate Top Layer Backward
        </button>
      </>
    </>
  );
}

export default RubiksCube;

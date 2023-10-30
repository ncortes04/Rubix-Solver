import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TWEEN from "tween.js";
import {
  colorMap,
  leftFace,
  rightFace,
  backFace,
  frontFace,
  topFace,
  bottomFace,
  createMaterials,
  findCubesByCoordinate,
} from "../utils/ThreeCubeHelper";
const Cube = require("cubejs");
const colorToSticker = {
  y: "D", // Yellow
  g: "L", // Green
  r: "R", // Red
  o: "F", // Orange
  b: "B", // Blue
  w: "U", // White
};

function generateCube(cubeContainer) {
  const cubeSize = 1;
  const cubeSpacing = 0.02; // Adjust the spacing

  for (let z = 0; z < 3; z++) {
    // Bottom to Top
    for (let x = 0; x < 3; x++) {
      // Left to Right
      for (let y = 0; y < 3; y++) {
        // Front to Back
        // Create and position the cubelet here
        const cubeletGeometry = new THREE.BoxGeometry(
          cubeSize,
          cubeSize,
          cubeSize
        );

        const { colorMaterial } = createMaterials(
          x,
          z,
          leftFace[2 - y],
          rightFace[2 - y],
          frontFace[2 - y],
          backFace[2 - y]
        );

        const cubeletMesh = new THREE.Mesh(cubeletGeometry, colorMaterial);
        if (y === 0) {
          cubeletMesh.material[3].color.set(colorMap[bottomFace[z][[x]]]);
        } else if (y == 2) {
          cubeletMesh.material[2].color.set(colorMap[topFace[z][[x]]]);
        }
        cubeletMesh.position.set(
          parseFloat((x * (cubeSize + cubeSpacing) - 1).toFixed(6)),
          parseFloat((y * (cubeSize + cubeSpacing) - 1).toFixed(6)),
          parseFloat((z * (cubeSize + cubeSpacing) - 1).toFixed(6))
        );

        cubeContainer.add(cubeletMesh);
      }
    }
  }
}

function RubiksCube() {
  const containerRef = useRef(null);
  const selectedCubeRef = useRef(null);
  const originalColorsMap = new Map();
  const scene = new THREE.Scene();
  const cubeContainer = new THREE.Group();
  const raycaster = new THREE.Raycaster();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  let mouse = new THREE.Vector2();
  let previousIntersectedObject = null;
  const animatingRef = useRef(false); // Use a ref to store animating state
  const POSITION_ADJUSTMENT = 0.0499;
  const ROTATION_DURATION = 1000;

  function rotateLayer(axis, layer, direction) {
    if (animatingRef.current) {
      return; // Prevent new animations if already animating
    }

    animatingRef.current = true;

    const sameLayerCubes = findCubesByCoordinate(axis, layer, cubeContainer);

    // Create a temporary group to hold the cubes for rotation
    const tempGroup = new THREE.Group();

    // Add the cubes from the selected layer to the temporary group
    sameLayerCubes.forEach((cube) => {
      tempGroup.add(cube);
    });

    // Adjust the position of the temporary group based on axis and direction
    const positionAdjustment = new THREE.Vector3();
    if (axis === "y" && direction > 0) {
      positionAdjustment.set(0, 0, POSITION_ADJUSTMENT);
    } else if (axis === "y" && direction < 0) {
      positionAdjustment.set(POSITION_ADJUSTMENT, 0, 0);
    } else if (axis === "x" && direction < 0) {
      // Adjust other positions as needed
      positionAdjustment.set(0, 0, POSITION_ADJUSTMENT);
    } else if (axis === "x" && direction > 0) {
      positionAdjustment.set(0, POSITION_ADJUSTMENT, 0);
    }
    tempGroup.position.add(positionAdjustment);

    // Add the temporary group to the cubeContainer for rotation
    cubeContainer.add(tempGroup);

    // Reset the rotation of the temporary group
    tempGroup.rotation.set(0, 0, 0);

    // Define the angle of rotation (90 degrees in radians)
    const angle = (Math.PI / 2) * direction;

    // Define the target rotation for the group
    const targetRotation = new THREE.Vector3(
      axis === "x" ? angle : 0,
      axis === "y" ? angle : 0,
      axis === "z" ? angle : 0
    );

    // Perform the animation
    new TWEEN.Tween(tempGroup.rotation)
      .to(targetRotation, ROTATION_DURATION) // Duration in milliseconds
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => {
        // When the rotation is complete, remove the cubes from the temporary group
        sameLayerCubes.forEach((cube) => {
          // Remove the cube from the temporary group
          tempGroup.remove(cube);

          // Apply the rotation to the cube
          cube.applyMatrix4(tempGroup.matrixWorld);

          // Add the cube back to the cubeContainer
          cubeContainer.add(cube);
        });

        // Remove the temporary group from the cubeContainer
        cubeContainer.remove(tempGroup);

        animatingRef.current = false; // Animation complete
      })
      .start(); // Start the tween animation
  }
  function solveCube() {
    const faces = [
      topFace,
      rightFace,
      frontFace,
      bottomFace,
      leftFace,
      backFace,
    ];
    let res = "";
    for (let i = 0; i < 6; i++) {
      const face = faces[i];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          res += colorToSticker[face[row][col]];
        }
      }
    }
    const cubeObject = Cube.fromString(res);
    Cube.initSolver();

    // Set the cube's state from the provided cubeString.
    // Solve the cube.
    const solution = cubeObject.solve();

    // Print the solution.
    convertSolutionToMoves(solution);
    // Now, you can solve the cube.
  }
  function convertSolutionToMoves(solution) {
    console.log(solution);
    const VALID = {
      U: ["y", 1, -1],
      "U'": ["y", 1, 1],
      D: ["y", -1, -1],
      "D'": ["y", -1, 1],
      R: ["x", 1, -1],
      "R'": ["x", 1, 1],
      L: ["x", -1, -1],
      "L'": ["x", -1, 1],
      F: ["z", 1, 1],
      "F'": ["z", 1, -1],
      B: ["z", -1, 1],
      "B'": ["z", -1, 1],
    };
    const moves = solution.split(" ");
    let index = 0;

    function executeNextMove() {
      if (index < moves.length) {
        const move = moves[index];
        index++;

        if (move.slice(-1) === "2") {
          // Handle double moves
          const call = VALID[move[0]];
          rotateLayer(call[0], call[1], call[2]);
          setTimeout(ROTATION_DURATION);
          rotateLayer(call[0], call[1], call[2]);

          setTimeout(executeNextMove, ROTATION_DURATION);
        } else {
          const call = VALID[move];
          if (call) {
            rotateLayer(call[0], call[1], call[2]);
            setTimeout(executeNextMove, ROTATION_DURATION);
          } else {
            console.error(`Invalid move: ${move}`);
            executeNextMove();
          }
        }
      }
    }

    executeNextMove(); // Start executing moves
  }
  function handleArrowKeyPress(event) {
    if (!selectedCubeRef.current) return; // Exit if no cube is selected

    const { x, y, z } = selectedCubeRef.current.position;
    // Determine layer based on selected cube's position
    console.log(x);
    switch (event.key) {
      case "a":
        rotateLayer("y", y, -1); // Rotate Y layer counter-clockwise
        break;
      case "d":
        rotateLayer("y", y, 1); // Rotate Y layer clockwise
        break;
      case "w":
        rotateLayer("x", x, -1); // Rotate X layer counter-clockwise
        break;
      case "s":
        rotateLayer("x", x, 1); // Rotate X layer clockwise
        break;
      case "q":
        rotateLayer("z", z, 1); // Rotate X layer clockwise
        break;
      case "e":
        rotateLayer("z", z, -1); // Rotate X layer clockwise
        break;
      default:
        break;
    }
  }
  function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Log the mouse position for debugging
  }
  function onCubeClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycasting
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubeContainer.children);

    if (intersects.length > 0) {
      const clickedCube = intersects[0].object;

      // Unhighlight the previously selected cube, if any
      if (selectedCubeRef.current && selectedCubeRef.current !== clickedCube) {
        const originalProperties = originalColorsMap.get(
          selectedCubeRef.current.uuid
        );
        if (originalProperties) {
          selectedCubeRef.current.material.forEach((material, index) => {
            material.color.set(originalProperties[index].color);
            material.opacity = originalProperties[index].opacity;
          });
        }
      }

      // Store the original properties if not already stored
      if (!originalColorsMap.has(clickedCube.uuid)) {
        originalColorsMap.set(
          clickedCube.uuid,
          clickedCube.material.map((m) => {
            return { color: m.color.getHex(), opacity: m.opacity };
          })
        );
      }

      // Apply opacity effect to clicked cube
      clickedCube.material.forEach((material) => {
        material.opacity = 0.5; // Set desired opacity for clicked cube
      });

      // Update the selected cube reference
      selectedCubeRef.current = clickedCube;
    }
  }

  window.addEventListener("keydown", handleArrowKeyPress);
  window.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("click", onCubeClick, false);
  useEffect(() => {
    // Create a container to hold the cubelets and set its position to the center
    cubeContainer.position.set(0, 0, 0); // Centered position
    scene.add(cubeContainer);

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

    // Generate the Rubik's Cube
    generateCube(cubeContainer);

    // Render function to create and animate the scene
    // Initialize a map to store the original colors of the cubelets

    const animate = () => {
      requestAnimationFrame(animate);

      // Raycasting for hover effect
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubeContainer.children);

      // Reset previous intersected object if it's different from the current one
      if (
        previousIntersectedObject &&
        (!intersects[0] ||
          previousIntersectedObject !== intersects[0]?.object) &&
        previousIntersectedObject !== selectedCubeRef.current
      ) {
        previousIntersectedObject.material.forEach((material, index) => {
          const originalProperties = originalColorsMap.get(
            previousIntersectedObject.uuid
          );
          if (originalProperties) {
            material.color.set(originalProperties[index].color);
            material.opacity = originalProperties[index].opacity;
          }
        });
        previousIntersectedObject = null;
      }
      if (
        intersects.length > 0 &&
        intersects[0].object !== selectedCubeRef.current
      ) {
        const firstIntersectedObject = intersects[0].object;
        firstIntersectedObject.material.forEach((material) => {
          if (!originalColorsMap.has(firstIntersectedObject.uuid)) {
            originalColorsMap.set(
              firstIntersectedObject.uuid,
              firstIntersectedObject.material.map((m) => {
                return { color: m.color.getHex(), opacity: m.opacity };
              })
            );
          }
          material.opacity = 0.5; // Change opacity on hover
        });

        // Update the previous intersected object
        previousIntersectedObject = firstIntersectedObject;
      }

      renderer.render(scene, camera);
      TWEEN.update(); // Update Tween.js animations
    };

    animate();

    return () => {
      // Cleanup function
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onCubeClick);
      window.removeEventListener("keydown", handleArrowKeyPress);

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} />
      <button
        onClick={() => {
          console.log(solveCube());
        }}
      >
        Find Cubes
      </button>
    </>
  );
}

export default RubiksCube;

import * as THREE from "three";

export const colorMap = {
  r: 0xff0000, // Red
  g: 0x00ff00, // Green
  b: 0x0000ff, // Blue
  w: 0xffffff, // White
  y: 0xffff00, // Yellow
  o: 0xffa500, // Orange
};

export const bottomFace = [
  ["y", "y", "y"],
  ["y", "y", "y"],
  ["y", "y", "y"],
];

export const leftFace = [
  ["g", "g", "g"],
  ["g", "g", "g"],
  ["g", "g", "g"],
];

export const rightFace = [
  ["r", "r", "r"],
  ["r", "r", "r"],
  ["r", "r", "r"],
];

export const frontFace = [
  ["o", "o", "o"],
  ["o", "o", "o"],
  ["o", "o", "o"],
];

export const backFace = [
  ["b", "b", "b"],
  ["b", "b", "b"],
  ["b", "b", "b"],
];
export const topFace = [
  ["w", "w", "w"],
  ["w", "w", "w"],
  ["w", "w", "w"],
];
export function createMaterials(x, y, left, right, front, back) {
  let materials = Array(6)
    .fill()
    .map(
      () => new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })
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
  return { colorMaterial: materials };
}

export function findCubesByCoordinate(coordinate, value, rubiksCube) {
  value = Math.round(value);
  return rubiksCube.children.filter(
    (cube) => Math.round(cube.position[coordinate]) === value
  );
}

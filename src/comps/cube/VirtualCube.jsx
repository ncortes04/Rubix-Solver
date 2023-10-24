import React from "react";
import ThreeCube from "../../Three/ThreeCube";

const VirtualCube = () => {
  // Define the cubeColors array here
  const cubeColors = [
    [
      // Front side
      [0xff0000, 0xff0000, 0xff0000], // First row
      [0xff0000, 0xff0000, 0xff0000], // Second row
      [0xff0000, 0xff0000, 0xff0000], // Third row
    ],
    [
      // Back side
      [0x00ff00, 0x00ff00, 0x00ff00], // First row
      [0x00ff00, 0x00ff00, 0x00ff00], // Second row
      [0x00ff00, 0x00ff00, 0x00ff00], // Third row
    ],
    [
      // Left side
      [0x0000ff, 0x0000ff, 0x0000ff], // First row
      [0x0000ff, 0x0000ff, 0x0000ff], // Second row
      [0x0000ff, 0x0000ff, 0x0000ff], // Third row
    ],
    [
      // Right side
      [0xffff00, 0xffff00, 0xffff00], // First row
      [0xffff00, 0xffff00, 0xffff00], // Second row
      [0xffff00, 0xffff00, 0xffff00], // Third row
    ],
    [
      // Top side
      [0xff00ff, 0xff00ff, 0xff00ff], // First row
      [0xff00ff, 0xff00ff, 0xff00ff], // Second row
      [0xff00ff, 0xff00ff, 0xff00ff], // Third row
    ],
    [
      // Bottom side
      [0x00ffff, 0x00ffff, 0x00ffff], // First row
      [0x00ffff, 0x00ffff, 0x00ffff], // Second row
      [0x00ffff, 0x00ffff, 0x00ffff], // Third row
    ],
  ];

  return (
    <div>
      {/* Pass the cubeColors array as a prop to ThreeCube */}
      <ThreeCube cubeColors={cubeColors} />
    </div>
  );
};

export default VirtualCube;

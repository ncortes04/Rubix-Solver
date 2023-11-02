import React, { useState } from "react";

const colors = ["r", "b", "g", "o", "w", "y"];

const CubeCreate = ({ side, onChange }) => {
  const [sideColors, setSideColors] = useState(Array(9).fill(""));

  const handleColorChange = (index, color) => {
    const newColors = [...sideColors];
    newColors[index] = color;
    setSideColors(newColors);
    onChange(side, newColors);
  };

  return (
    <div>
      <h3>{`Input colors for ${side} side:`}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "5px",
        }}
      >
        {sideColors.map((color, index) => (
          <select
            key={index}
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
          >
            <option value="">Select Color</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
};

export default CubeCreate;

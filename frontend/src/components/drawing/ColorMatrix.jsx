import React from "react";
import "./colormatrix.scss"

export default function ColorMatrix ({ colors, width})  {
  const colorArray = colors.split(' ');

  const matrixStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
  };
  
  //console.log(colorArray)

  const handleCopyColors = () => {
    const pixels = document.querySelectorAll('.pixel');
    colorArray.forEach((color, index) => {
      if (pixels[index]) {
        pixels[index].style.backgroundColor = color;
      }
    });
  };


  return (
    <div id="elements">
      <div id="element" style={matrixStyles}>
        {colorArray.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              height: '5px', 
              width: '5px',
            }}
          />
        ))}
      </div>
      <button onClick={handleCopyColors} >add</button>
    </div>
  );
};
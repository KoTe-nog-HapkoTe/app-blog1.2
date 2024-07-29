import React, { useState, useEffect } from "react";
import "./pixel.scss";

export default function Pixel(props) {
  const { selectedColor } = props;

  const [pixelColor, setPixelColor] = useState("#fff");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);
  const [isSpacePressed, setSpacePressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setSpacePressed(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  function applyColor() {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  }

  function clearColor() {
    setPixelColor("#fff");
  }

  const containerStyle = {
    backgroundColor: pixelColor,
    border: isSpacePressed ? '1px solid #000' : 'none',
  };

  return (
    <div
      className="pixel"
      onMouseDown={applyColor}
      onContextMenu={(e) => e.preventDefault()}
      onDoubleClick={clearColor}
      style={containerStyle}
    ></div>
  );
}

import React, {useState , useRef, useContext, useEffect } from "react";
import "./drawingPanel.scss";
import Row from "./Row";
import { Link } from "react-router-dom"
import { exportComponentAsPNG } from "react-component-export-image";
import axios from "axios";
import { Context } from "../../context/Context"

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';



export default function DrawingPanel(props) {

  const { user } = useContext(Context)

  const { width, height, selectedColor } = props;

  const panelRef = useRef();

  let rows = [];

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />);
  }

  // console.log(rows)
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [file, setFile] = useState('')

  const rgbToHex = (rgb) => {
    const hex = rgb
      .replace(/^rgba?\(|\s+|\)$/g, '')
      .split(',')
      .map((value) => {
        const intValue = parseInt(value, 10);
        const hexValue = intValue.toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
      })
      .join('');
    return `#${hex}`;
  };

  //------------------------------------back---

  const sendColorsToBackend = async (colors) =>{
    // if (panelRef.current) {
    //   html2canvas(panelRef.current).then((canvas) => {
    //     setFile(canvas.toDataURL());

    //   });
    // }
    

    const newPrint = {
      colors: colors,
      width: width,
      picture: file,

    }

    try {
      await axios.post('/prints', newPrint);
      //window.location.replace("/drawing")
    } catch (error) {
      console.error('hueta', error.message);
    }
  }
  //------------------------------------back---

  const getBackgroundColors =  () => {

    handleDownloadImage();

    const pixelsContainer = document.getElementById('pixels');
    if (pixelsContainer) {
      const pixels = pixelsContainer.getElementsByTagName('div');
      let colors = '';

      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i];
        const computedStyle = window.getComputedStyle(pixel);
        const backgroundColor = computedStyle.backgroundColor;

        const hexColor = rgbToHex(backgroundColor);
        if (hexColor !== '#00000000'){
          colors += hexColor + ' ';
        }
      }
      //console.log(colors)
      setBackgroundColors(colors);
      //handleDownloadImage();
      sendColorsToBackend(colors);
    }
  };


  //
  const handleDownloadImage = () => {
    if (panelRef.current) {
      html2canvas(panelRef.current).then((canvas) => {
        setFile(canvas.toDataURL());
      });
    }
  };

  return (
    <div id="drawingPanel">
        <div id="pixels" required ref={panelRef}>
          {rows}
        </div>
        <div id="buttons">
          <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
            Export as PNG
          </button>
          
          {user ?(
            <div className="userBut">
              <button className="button" onClick={handleDownloadImage} >
                send
              </button>           
  <           button className="button" onClick={getBackgroundColors} >
                +
              </button>
            </div>
          ):(        
            <button className="button">
              <Link to="/login"> to login </Link>
            </button>         
          )}
          
        </div>
    </div>
  );
}


import React, { useState, useContext, useEffect } from "react";
import "./editor.scss";
import { ChromePicker, CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
import ColorMatrix from "./ColorMatrix"
import axios from "axios";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Context } from "../../context/Context"
import { Card } from "../blog/Card";
//import { print,colors } from "../../assets/data/data"

export const Editor = () => {
  const [panelWidth, setPanelWidth] = useState(4);
  const [panelHeight, setPanelHeight] = useState(4);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("start drawing");
  const [selectedColor, setColor] = useState("#f44336");

  function initializeDrawingPanel() {
    setHideOptions(!hideOptions);
    setHideDrawingPanel(!hideDrawingPanel);

    buttonText === "start drawing"
      ? setButtonText("reset")
      : setButtonText("start drawing");
  }

  function changeColor(color) {
    setColor(color.hex);
  }


//--------------------------------------------------------------
  const { user } = useContext(Context);

  const [prints, setPrints] = useState([]);

  const { search } = useLocation()

  useEffect(() => {
    const fetchPrints = async () => {
      const res = await axios.get("/prints" + search)
      setPrints(res.data)
    }
    fetchPrints ()
  }, [search])

//--------------------------------------------------------
  return (
    <div id="editor">

      <div id="tool">
        <div id="cip">
          <CirclePicker color={selectedColor} onChangeComplete={changeColor}  />
        </div>
        <div id="chp">
          <ChromePicker color={selectedColor} onChange={changeColor} />
        </div>
      </div>
      
      <div id="workspace">
        <h1>Pixel Editor</h1>
        {hideDrawingPanel && <h2>Enter Panel Dimensions</h2>}
        {hideDrawingPanel && (
          <div id="options">
            <div className="option">
            <input
              type="number"
              className="panelInput"
              defaultValue={panelWidth}
              onChange={(e) => {
                const value = Math.min(parseInt(e.target.value, 10), 512);
                setPanelWidth(value);
              }}
              max={512}
            />
              <span>Width</span>
            </div>
            <div className="option">
              <input
                type="number"
                className="panelInput"
                defaultValue={panelHeight}
                onChange={(e) => {
                  const value = Math.min(parseInt(e.target.value, 10), 512);
                  setPanelHeight(value);
                }}
                max={512}
              />
              <span>Height</span>
            </div>
          </div>
        )}

        <button onClick={initializeDrawingPanel} className="button">
          {buttonText}
        </button>

        {hideOptions && (
          <DrawingPanel
            width={panelWidth}
            height={panelHeight}
            selectedColor={selectedColor}
          />
        )}
      </div>

      <div className="printList">
        {user ?(
            <div className="slides">
              
              <div className="clrmatr">
                {prints.map((prints, index) => (
                  <ColorMatrix key={index} {...prints} />
                ))}
              </div> 


              
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
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear } from "d3";
import "./main.css";
import Dashboard from "./components/Dashboard";
import Track from "./components/Track";
import { existingOptions, } from "./constants";
import { dataFileManager } from "./dataFileManager";
import Legend from "./components/Legend";
import { findBoundariesOfCharacteristic } from "./helpers/boundaries";

function App() {

  const state = useSelector(state => state);
  const dataType = state["dashboard"]["dataType"];
  const headers = existingOptions[dataType]["headers"];
  const tracks = state["dashboard"][1];
  const data = dataFileManager[dataType];

  console.log(existingOptions[dataType].legendLabel)

  // set the colour scale wrt all of the selected items' boundaries
  let low = Infinity;
  let high = -Infinity;
  for (let i=0; i<tracks.length; i++) {
    const value = findBoundariesOfCharacteristic(data[tracks[i]], "length");
    if (value.low < low) low = value.low;
    if (value.high > high) high = value.high;
  }
  var colourScale = scaleLinear()
  .domain([low, high])
  .range([0, 1]);
  
  const elements = headers.map((el, i) => {
    return (
      <div>
        <h2>{el}</h2>
        <Track trackType={i+1} colourScale={colourScale} />
      </div>
    );
  });

  return (
    <div className="main-app">
      <Dashboard />
      {elements}
      <Legend colourScale={colourScale} low={low} high={high} label={existingOptions[dataType].legendLabel} />
    </div>
  );
}
export default App;

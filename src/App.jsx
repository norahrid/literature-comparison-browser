import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import "./main.css";
import Dashboard from "./components/Dashboard";
import { existingOptions, genomeOptions } from "./constants";
import GlobalView from "./components/GlobalView";
import ChunkView from "./components/ChunkView";
import SubregionView from "./components/SubregionView";


function App() {

  const g = Object.keys(genomeOptions);

  const headers = existingOptions["LITERATURE"]["headers"].map((header, i) => {
    return (
      <div>
        <p>{header}</p>
        <GlobalView />
      </div>
      
    )
  })


  return (
    <div className="main-app">
      <Dashboard />

      <GlobalView />

      <ChunkView />

      <SubregionView />

      {/* {headers} */}

    </div>
  );
}
export default App;

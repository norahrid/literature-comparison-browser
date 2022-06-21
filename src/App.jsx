import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import "./main.css";
import Dashboard from "./components/Dashboard";
import GlobalView from "./components/GlobalView";
import ChunkView from "./components/ChunkView";
import SubregionView from "./components/SubregionView";
import { existingOptions, } from "./constants";


function App() {

  const state = useSelector(state => state);
  const dataType = state["dashboard"]["dataType"];


  const headers = existingOptions[dataType]["headers"].map((header, i) => {
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

import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import "./main.css";
import Dashboard from "./components/Dashboard";
import Track from "./components/Track";
import { existingOptions, } from "./constants";
import Legend from "./components/Legend";

function App() {

  const state = useSelector(state => state);
  const dataType = state["dashboard"]["dataType"];
  const headers = existingOptions[dataType]["headers"];
  
  const elements = headers.map((el, i) => {
    return (
      <div>
        <h2>{el}</h2>
        <Track trackType={i+1} />
      </div>
    );
  });


  return (
    <div className="main-app">
      <Dashboard />
      {elements}
      <Legend />
    </div>
  );
}
export default App;

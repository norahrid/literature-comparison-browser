import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import FileDrop from "./components/FileDrop";
import { dashboardReducer } from './redux/reducers/dashboardSlice';
import { globalReducer } from './redux/reducers/globalSlice';
import { chunkReducer } from "./redux/reducers/chunkSlice";
import { subregionReducer } from "./redux/reducers/subregionSlice";


const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    global: globalReducer,
    chunk: chunkReducer,
    subregion: subregionReducer,
  },
});

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="process" element={<FileDrop/>} />
        </Routes>
        
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

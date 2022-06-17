import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import FileDrop from "./components/FileDrop";
import { dashboardReducer } from './reducers/dashboardSlice';
import { globalReducer } from './reducers/globalSlice';


const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    global: globalReducer,
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

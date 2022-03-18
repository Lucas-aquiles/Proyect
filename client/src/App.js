import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LangPag";

import Home from "./components/Home";
function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />


    </Routes>
  );
}

export default App;

import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LangPag";

import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path='/create' element={<Form />} />

    </Routes>
  );
}

export default App;

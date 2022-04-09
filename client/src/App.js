import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LangPage/LangPag";

import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Details from './components/Details/Details';


function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path='/create' element={<Form />} />
      <Route path='details/:id' element={<Details />} />


    </Routes>
  );
}

export default App;

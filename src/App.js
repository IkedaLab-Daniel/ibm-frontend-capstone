import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Landing from './Landing_Page/Landing';

function App(){
  return(
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

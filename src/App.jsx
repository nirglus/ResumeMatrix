import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import Footer from './components/Footer';
import Resume from './pages/Resume';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/login" element={<Auth />} />
     </Routes>
     <Footer />
    
    </BrowserRouter>
    </>
  )
}

export default App

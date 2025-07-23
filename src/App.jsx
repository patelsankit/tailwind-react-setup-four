import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeContent from './components/HomeContent';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

function Home() {
  return (
    <>
<HomeContent/>
<div className="p-8 text-center">Welcome to the Home Page!</div>;
    </>
  )


}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

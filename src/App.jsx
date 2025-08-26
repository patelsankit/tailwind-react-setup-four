import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeContent from "./components/HomeContent";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import StepForm from "./components/StepForm";

function Home() {
  return (
    <>
      <HomeContent />
      <div className="text-center mt-5">
        <Link
          target="_blank"
          to="https://patelsankit.vercel.app"
          className="p-8 text-center"
        >
          Portfolio Website
        </Link>
      </div>
    </>
  );
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
        <Route path="/step-form" element={<StepForm />} />
      </Routes>
    </Router>
  );
}

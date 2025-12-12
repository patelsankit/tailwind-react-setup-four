import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeContent from "./components/HomeContent";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import StepForm from "./components/StepForm";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

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
      <Routes>
        {/* Routes with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <Services />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        <Route
          path="/step-form"
          element={
            <>
              <Navbar />
              <StepForm />
            </>
          }
        />

        {/* Auth Routes with AuthLayout (no Navbar) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

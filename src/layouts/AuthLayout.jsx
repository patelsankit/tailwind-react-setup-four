import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  const starsRef = useRef(null);
  const cosmicRef = useRef(null);

  useEffect(() => {
    const starsContainer = starsRef.current;
    const cosmicContainer = cosmicRef.current;

    // Create moving stars
    const createStars = () => {
      if (!starsContainer) return;

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.animationDuration = Math.random() * 2 + 1 + "s";

        // Random star sizes
        const size = Math.random() * 3 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";

        starsContainer.appendChild(star);
      }
    };

    // Create cosmic effects
    const createCosmicEffects = () => {
      if (!cosmicContainer) return;

      for (let i = 0; i < 20; i++) {
        const cosmic = document.createElement("div");
        cosmic.className = "cosmic-particle";
        cosmic.style.left = Math.random() * 100 + "%";
        cosmic.style.top = Math.random() * 100 + "%";
        cosmic.style.animationDelay = Math.random() * 4 + "s";
        cosmic.style.animationDuration = Math.random() * 6 + 4 + "s";
        cosmicContainer.appendChild(cosmic);
      }
    };

    createStars();
    createCosmicEffects();

    // Cleanup
    return () => {
      if (starsContainer) {
        starsContainer.innerHTML = "";
      }
      if (cosmicContainer) {
        cosmicContainer.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="min-h-screen via-[#2e2d31] to-[#53462c] md:pt-55 relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-black px-4 pb-12 pt-60 md:pb-20">
      {/* Stars Container */}
      <div
        ref={starsRef}
        className="stars-container pointer-events-none absolute inset-0"
      ></div>
      {/* Cosmic Effects Container */}
      <div
        ref={cosmicRef}
        className="cosmic-container pointer-events-none absolute inset-0"
      ></div>
      {/* Floating Decorative Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="floating-gold animate-float-slow top-50 absolute left-10 h-16 w-16 rounded-full bg-gradient-to-br from-[#FFE7B9] to-[#CAA969] opacity-70 shadow-2xl shadow-[#CAA969]/30"></div>
        <div className="floating-silver animate-float-medium absolute right-20 top-40 h-12 w-12 rounded-full bg-gradient-to-br from-[#F1F1F1] to-[#8B8B8B] opacity-60 shadow-2xl shadow-[#8B8B8B]/30"></div>
        <div className="floating-platinum animate-float-fast absolute bottom-32 left-20 h-20 w-20 rounded-full bg-gradient-to-br from-[#F1F1F1] to-[#7F99A8] opacity-50 shadow-2xl shadow-[#7F99A8]/30"></div>
        <div className="floating-gold-2 animate-float-reverse absolute bottom-20 right-10 h-8 w-8 rounded-full bg-gradient-to-br from-[#D1AB59] to-[#CAA969] opacity-80 shadow-xl shadow-[#D1AB59]/40"></div>
        <div className="floating-gold-3 animate-orbit-slow absolute left-5 top-1/2 h-6 w-6 rounded-full bg-gradient-to-br from-[#FFE7B9] to-[#D1AB59] opacity-60"></div>
        <div className="floating-silver-2 animate-orbit-medium absolute right-5 top-1/3 h-10 w-10 rounded-full bg-gradient-to-br from-[#F1F1F1] to-[#B4B4B4] opacity-50"></div>
        <div className="floating-platinum-2 animate-orbit-fast absolute bottom-1/3 left-1/2 h-14 w-14 rounded-full bg-gradient-to-br from-[#7F99A8] to-[#989080] opacity-40"></div>
        <div className="animate-spin-slow absolute right-1/4 top-1/4 h-32 w-32 rounded-full border-2 border-[#CAA969]/20"></div>
        <div className="animate-spin-reverse absolute bottom-1/4 left-1/4 h-24 w-24 rounded-full border border-[#8B8B8B]/20"></div>
        <div className="animate-spin-very-slow absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-[#7F99A8]/15"></div>
      </div>
      {/* Page Content */}
      <Outlet />
    </div>
  );
}

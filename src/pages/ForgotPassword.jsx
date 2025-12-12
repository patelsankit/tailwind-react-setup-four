"use client";
import React, { useState } from "react";
import { Input } from "../components/input";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div>
      <div className="animate-fade-in-up group relative w-full overflow-hidden rounded-2xl border border-[#CAA969]/20 bg-gradient-to-br from-black/80 via-[#1a1a1a]/90 to-black/80 p-6 shadow-2xl backdrop-blur-xl transition-all !duration-100 hover:border-[#CAA969]/40 hover:shadow-[#CAA969]/20 sm:w-[460px] sm:p-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="animate-text-shimmer mb-3 bg-gradient-to-r from-[#CAA969] via-[#FFE7B9] to-[#CAA969] bg-clip-text text-3xl font-bold text-transparent">
            Forgot Password
          </h1>
          <p className="text-sm text-[#8B8B8B]">
            Enter your registered email address and you will get a link to reset
            your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form className="space-y-6">
          {/* Email Field */}
          <div className="group/input relative">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#B4B4B4]"
            >
              Email address
            </label>
            <Input
              labelInput={false}
              type="email"
              id="email"
              className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#8B8B8B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
              placeholder="Email address"
              required
            />
          </div>

          {/* Back to Login Link */}
          <div className="text-left">
            <p className="text-sm text-[#8B8B8B]">
              Remembered your credentials?{" "}
              <Link
                to="/auth/login"
                className="font-semibold text-[#CAA969] underline transition-colors duration-300 hover:text-[#FFE7B9]"
              >
                Back to Login
              </Link>
            </p>
          </div>

          {/* Send Link Button */}
          <button
            type="submit"
            className="group/button relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-[#CAA969] to-[#D1AB59] py-4 font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#CAA969]/20"
          >
            <span className="relative z-10">Send Link</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

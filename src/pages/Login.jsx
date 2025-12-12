import { Link } from "react-router-dom";
import { Input } from "../components/input";

const LoginPage = () => {
  return (
    <div>
      <div className="animate-fade-in-up group relative w-full overflow-hidden rounded-2xl border border-[#CAA969]/20 bg-gradient-to-br from-black/80 via-[#1a1a1a]/90 to-black/80 p-6 shadow-2xl backdrop-blur-xl transition-all !duration-100 hover:border-[#CAA969]/40 hover:shadow-[#CAA969]/20 sm:w-[460px] sm:p-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="animate-text-shimmer mb-2 bg-gradient-to-r from-[#CAA969] via-[#FFE7B9] to-[#CAA969] bg-clip-text text-4xl font-bold text-transparent"
          >
            Welcome Back
          </Link>
          <p className="text-sm text-[#8B8B8B]">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          {/* Email Field */}
          <div className="group/input relative">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#CAA969] transition-all duration-300 group-hover/input:text-[#FFE7B9]"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="h-5 w-5 text-[#8B8B8B] transition-all duration-300 group-hover/input:text-[#CAA969]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <Input
                type="email"
                id="email"
                labelInput={false}
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 py-3 pl-12 pr-4 text-white placeholder-[#8B8B8B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group/input relative">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#CAA969] transition-all duration-300 group-hover/input:text-[#FFE7B9]"
            >
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="h-5 w-5 text-[#8B8B8B] transition-all duration-300 group-hover/input:text-[#CAA969]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <Input
                type="password"
                id="password"
                labelInput={false}
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 py-3 pl-12 text-white placeholder-[#8B8B8B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="group/button  relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-[#CAA969] to-[#D1AB59] py-4 font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#CAA969]/20"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In to Your Account
            </span>
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-[#8B8B8B] transition-colors duration-300 hover:text-[#CAA969]"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-[#8B8B8B]/20"></div>
          <span className="px-4 text-xs text-[#8B8B8B]">OR</span>
          <div className="flex-1 border-t border-[#8B8B8B]/20"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-[#8B8B8B]">
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/register"
              className="font-semibold text-[#CAA969] transition-colors duration-300 hover:text-[#FFE7B9]"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

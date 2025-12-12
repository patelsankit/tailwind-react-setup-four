import React, { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "stepForm", href: "/step-form" },
  { name: "Login", href: "/auth/login" },
  { name: "Register", href: "/auth/register" },
  { name: "Forgot Password", href: "/auth/forgot-password" },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : true;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center flex-shrink-0">
          <img
            src="/sankit-avatar.png"
            alt="Logo"
            className="h-16 w-16 animate-spin-slow"
          />
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="relative text-gray-700 dark:text-gray-200 font-medium px-2 py-1 transition-colors duration-200 hover:text-blue-500 dark:hover:text-blue-400 group"
            >
              {item.name}
              <span className="block h-0.5 w-0 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setDarkMode((d) => !d)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                />
              </svg>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Menu"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/50 bg-opacity-40 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <img
            src="/sankit-avatar.png"
            alt="Logo"
            className="h-16 w-16 animate-spin-slow"
          />
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close Menu"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="flex flex-col mt-4 space-y-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 dark:text-gray-200 font-medium px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-4 py-4">
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setDarkMode((d) => !d)}
            className="w-full flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                />
              </svg>
            )}
          </button>
        </div>
      </aside>
      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
      `}</style>
    </nav>
  );
}

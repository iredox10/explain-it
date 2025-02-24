import React from "react";
import { Link } from "react-router-dom";

const Header = ({ searchOnChange, title, subtitle, showSearch = true }) => {
  return (
    <div className="relative bg-primary-color min-h-[15rem] w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Logo</h1>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-12 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight capitalize mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 capitalize">
            {subtitle}
          </p>
        </div>

        {showSearch ? (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <input
                type="search"
                name="search"
                id="search"
                className="w-72 md:w-96 px-6 py-3 rounded-full shadow-xl border-2 border-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 transition-all"
                placeholder="Search..."
                onChange={searchOnChange}
              />
              <svg
                className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;

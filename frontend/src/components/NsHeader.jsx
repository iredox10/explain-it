
import React from "react";
import { Link } from "react-router-dom";


const NsHeader = ({headerText}) => {
  return (
    <div className="relative bg-gradient-to-r from-primary-color to-primary-color/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white font-satisfy">NewsPress</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-200 transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/categories" className="text-white hover:text-gray-200 transition-colors px-3 py-2 rounded-md text-sm font-medium">Categories</Link>
            <Link to="/about" className="text-white hover:text-gray-200 transition-colors px-3 py-2 rounded-md text-sm font-medium">About</Link>
          </nav>
        </div>

        <div className="mt-8 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white capitalize tracking-tight">
            {headerText}
          </h1>
          <div className="h-1 w-20 bg-white mt-4 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NsHeader;

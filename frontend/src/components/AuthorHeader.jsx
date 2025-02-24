import { Link } from "react-router-dom";

const AuthorHeader = ({ searchOnChange }) => {
  return (
    <div className="relative bg-primary-color min-h-[18rem] w-full shadow-lg">
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
      </div>
    </div>
  );
};

export default AuthorHeader;

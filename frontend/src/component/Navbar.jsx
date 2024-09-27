import { useState } from "react";
import { Link } from "react-router-dom";
import myImage from '../assets/logo.jpg';

const Navbar = ({ isLoggedIn, profilePic }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto"
                src={myImage}
                alt="BorrowIt Logo"
              />
              <span className="ml-2 font-bold text-2xl">BorrowIt</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              {['/dashboard', '/add-item', '/search', '/borrow-history'].map((path, index) => (
                <Link
                  key={index}
                  to={path}
                  className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  {path.replace('/', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>

          {/* User Profile or Login */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all duration-200">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span>Profile</span>
                  )}
                </Link>
                {/* Optional Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10 hidden">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-blue-200">Profile</Link>
                  <Link to="/logout" className="block px-4 py-2 hover:bg-blue-200">Logout</Link>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all duration-200"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['/dashboard', '/add-item', '/search', '/borrow-history', '/profile', '/login'].map((path, index) => (
              <Link
                key={index}
                to={path}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-all duration-200"
              >
                {path.replace('/', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

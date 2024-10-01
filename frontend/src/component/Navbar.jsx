import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myImage from '../assets/logo.jpg';
import { useDispatch, useSelector } from "react-redux";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../Redux/user/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State for notification count
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const NotificationCount = async () => {
      if (!currentUser) return; // Prevent fetching if no user is logged in
      try {
        const response = await fetch(`/backend/notification/count/${currentUser._id}`);
        const data = await response.json();
        setNotificationCount(data.count);
      } catch (error) {
        console.log(error);
      }
    };
    NotificationCount();
  }, [currentUser]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/backend/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate('/login');
    } catch (error) {
      dispatch(signOutUserFailure(error.message || "Logout failed"));
      console.log(error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section: Logo and Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src={myImage} alt="BorrowIt Logo" />
              <span className="ml-2 font-bold text-2xl">BorrowIt</span>
            </Link>
            <div className="hidden md:flex space-x-6 items-center">
              {/* Existing Navigation Links */}
              {['/dashboard', '/item', '/borrow-history'].map((path, index) => (
                <Link
                  key={index}
                  to={path}
                  className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  {path.replace('/', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </Link>
              ))}

              {/* New "My Item" Link */}

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="bg-white text-black rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-1 mr-2 text-blue-600 hover:text-blue-800"
                  aria-label="Search"
                >
                  🔍
                </button>
              </form>
            </div>
          </div>

          {/* Right Section: Notifications and User Profile */}
          <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
              <>
          <Link
                to="/my-item"
                className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                My Item
              </Link>
              <Link
                to="/cart"
                className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Cart
              </Link>
              </> ):('')}
              {currentUser ? (
              <>
            {/* Notifications Icon */}
            <Link to="/notifications" className="hover:bg-blue-700 p-2 rounded-md relative" aria-label="Notifications">
              <span className="text-2xl">🔔</span>
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {notificationCount}
                </span>
              )}
            </Link>
           </> ):('')}
          
            {currentUser ? (
              <>
                <Link to="/profile" className="flex items-center p-0" aria-label="Profile">
                  <img
                    src={currentUser.avatar || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover hover:opacity-80 transition-opacity duration-200"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Logout
                </button>
              </>
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
              aria-label="Toggle menu"
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

      {/* Search Bar in Mobile View */}
      <div className="md:hidden bg-blue-600 px-4 py-2">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full bg-white text-black rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="ml-2 text-blue-600 hover:text-blue-800"
            aria-label="Search"
          >
            🔍
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Existing Navigation Links */}
            {['/dashboard', '/item', '/borrow-history'].map((path, index) => (
              <Link
                key={index}
                to={path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-all duration-200"
              >
                {path.replace('/', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </Link>
            ))}
           { currentUser ? (
          <>
            {/* New "My Item" Link */}
            <Link
              to="/my-item"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-all duration-200"
            >
              My Item
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-all duration-200"
            >
              Cart
            </Link>
            </>  ):('')}
        { currentUser ? (
          <>
            {/* Notifications Icon in Mobile View */}
            <Link to="/notifications" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-all duration-200 relative" aria-label="Notifications">
              <span className="text-2xl">🔔</span>
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {notificationCount}
                </span>
              )}
            </Link>
            </>
        ):('')
}
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-all duration-200"
                  aria-label="Profile"
                >
                  <img
                    src={currentUser.avatar || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover mr-2"
                  />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

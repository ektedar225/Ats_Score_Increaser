import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={currentUser ? '/about' : '/login'} className="flex items-center">
              <span className="text-xl font-bold text-primary-700">Premium<span className="text-accent-500">Resume</span></span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {currentUser ? (
                <>
                  <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-700">
                    About Us
                  </Link>
                  <Link to="/subscriptions" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-700">
                    Subscriptions
                  </Link>
                  <div className="relative ml-3">
                    <div>
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center rounded-full text-sm"
                        id="user-menu-button"
                      >
                        <span className="mr-2 text-sm font-medium text-gray-700">
                          {currentUser.displayName || currentUser.email}
                        </span>
                        <User className="h-8 w-8 rounded-full bg-gray-200 p-1 text-gray-700" />
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <button
                          onClick={handleSignOut}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-primary-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {currentUser ? (
              <>
                <div className="border-b border-gray-200 py-2">
                  <div className="flex items-center px-3 py-2">
                    <User className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  </div>
                </div>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/subscriptions"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Subscriptions
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
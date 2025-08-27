import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import Logo from "../assets/logo3.png";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              className="h-10 w-auto" 
              src={Logo} 
              alt="Logo"
              style={{
                maxHeight: '40px',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

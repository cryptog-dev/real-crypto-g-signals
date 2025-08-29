import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import Logo from "../assets/logo3.png";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-forest-green-900/95 backdrop-blur-luxury shadow-forest border-b border-rich-gold-400/20">
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
              className="flex items-center space-x-1 text-champagne-300 hover:text-rich-gold-400 transition-all duration-200 px-3 py-2 rounded-luxury hover:bg-forest-green-800/50 font-heading"
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

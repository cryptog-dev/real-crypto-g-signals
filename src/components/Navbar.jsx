import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo3.png";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-md border-b border-[#F7E7CE]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                className="h-10 w-auto transition-all duration-300 hover:scale-105"
                src={Logo}
                alt="Logo"
                style={{
                  maxHeight: "40px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 4px rgba(255, 215, 0, 0.2))",
                }}
              />
            </Link>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-[#2D3748]/80 dark:text-[#F7FAFC]/80 hover:text-[#F56565] dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-lg px-3 py-2 transition-all duration-200 font-medium font-heading text-sm"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
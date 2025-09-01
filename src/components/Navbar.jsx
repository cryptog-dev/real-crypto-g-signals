import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { LogOut, User, Settings, Bell, Sun, Moon } from "lucide-react";
import Logo from "../assets/logo3.png";

const Navbar = () => {
  const { logout, user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${
      darkMode 
        ? "bg-[var(--color-neutral-dark)] border-b-4 border-[var(--color-primary)]/30" 
        : "bg-[var(--color-primary)] border-b-4 border-[var(--color-primary-dark)]/30"
    } shadow-lg transition-colors duration-300`}>
      
      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <img 
              className="h-10 w-auto transition-transform hover:scale-105" 
              src={Logo} 
              alt="The Real Crypto G"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-gray-700/50 transition-colors duration-200"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-white" />
              )}
            </button>
            
            {/* User Info - Lego Stud */}
            <div className="hidden sm:flex items-center space-x-3 text-sm bg-[var(--color-primary)] text-white px-4 py-2 rounded-full font-semibold shadow-sm border-b-4 border-[var(--color-primary-dark)] hover:border-b-2 hover:mt-0.5 transition-all duration-150">
              <User className="h-4 w-4" />
              <span className="font-medium">{user?.username}</span>
            </div>

            {/* Notifications - Lego Brick Button */}
            <button className="lego-button p-2 text-white bg-[var(--color-primary)]/90 hover:bg-[var(--color-primary)] rounded-lg shadow-sm border-b-4 border-[var(--color-primary-dark)]">
              <Bell className="h-5 w-5" />
            </button>

            {/* Settings - Lego Brick Button */}
            <button className="lego-button p-2 text-white bg-[var(--color-accent2)]/90 hover:bg-[var(--color-accent2)] rounded-lg shadow-sm border-b-4 border-[var(--color-accent2-dark)]">
              <Settings className="h-5 w-5" />
            </button>

            {/* Logout Button - Lego Brick Button */}
            <button
              onClick={logout}
              className="lego-button flex items-center space-x-2 px-4 py-2 text-sm bg-[var(--color-secondary)] text-white rounded-lg font-medium shadow-sm border-b-4 border-[var(--color-secondary-dark)]"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
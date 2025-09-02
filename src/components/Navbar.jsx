import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { LogOut, User, Settings, Bell, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo3.png";

const DropdownMenu = ({ trigger, children, align = "right" }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger */}
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <>
            {/* Click outside to close */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-2 w-64 bg-[var(--color-card-bg)] border border-[var(--color-border-light)] rounded-lg shadow-lg z-50`}
            >
              <div className="p-3">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { logout, user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 lego-card border-b border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] transition-colors duration-300 ${
        darkMode ? "bg-[var(--color-neutral-light)]" : "bg-[var(--color-card-bg)]"
      }`}
    >
      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="h-9 sm:h-12 w-auto transition-transform hover:scale-105"
              src={Logo}
              alt="Market Mastery"
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="lego-button p-2.5 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 rounded-lg border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] transition-all"
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-[var(--color-accent2)]" />
              ) : (
                <Moon className="h-5 w-5 text-[var(--color-primary)]" />
              )}
            </button>

            {/* Notifications Dropdown
            // <DropdownMenu
            //   trigger={
            //     <div className="lego-button p-2.5 bg-[var(--color-accent1)]/90 hover:bg-[var(--color-accent1)] text-white rounded-lg">
            //       <Bell className="h-5 w-5" />
            //     </div>
            //   }
            // >
            //   <h4 className="text-sm font-semibold mb-2">Notifications</h4>
            //   <p className="text-contrast-medium text-sm">No new notifications</p>
            //   <button className="w-full mt-2 text-sm text-[var(--color-primary)] hover:underline">
            //     View All
            //   </button>
            // </DropdownMenu> */}

            {/* Settings Dropdown */}
            {/* <DropdownMenu
              trigger={
                <div className="lego-button p-2.5 bg-[var(--color-accent2)]/90 hover:bg-[var(--color-accent2)] text-white rounded-lg">
                  <Settings className="h-5 w-5" />
                </div>
              }
            >
              <h4 className="text-sm font-semibold mb-2">Settings</h4>
              <button className="w-full text-left px-2 py-1 text-sm rounded hover:bg-[var(--color-accent2)]/10">
                Account Settings
              </button>
              <button className="w-full text-left px-2 py-1 text-sm rounded hover:bg-[var(--color-accent2)]/10">
                Preferences
              </button>
            </DropdownMenu> */}

            {/* Profile Dropdown (LinkedIn style) */}
            <DropdownMenu
              trigger={
                <div className="flex items-center space-x-2 cursor-pointer bg-[var(--color-primary)]/10 px-3 py-2 rounded-full border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)]">
                  <User className="h-5 w-5 text-[var(--color-primary)]" />
                  <span className="text-sm font-medium">{user?.username || "Trader"}</span>
                </div>
              }
            >
              {/* Profile Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="font-semibold">{user?.username || "Trader"}</p>
                  <p className="text-xs text-contrast-medium">Your Profile</p>
                </div>
              </div>
              <hr className="my-2 border-[var(--color-border-light)]" />
              {/* <button className="w-full text-left px-2 py-1 text-sm rounded hover:bg-[var(--color-primary)]/10">
                View Profile
              </button>
              <button className="w-full text-left px-2 py-1 text-sm rounded hover:bg-[var(--color-primary)]/10">
                My Signals
              </button>
              <button className="w-full text-left px-2 py-1 text-sm rounded hover:bg-[var(--color-primary)]/10">
                Settings
              </button> */}
              {/* <hr className="my-2 border-[var(--color-border-light)]" /> */}
              <button
                onClick={logout}
                className="w-full text-left px-2 py-1 text-sm text-[var(--color-secondary)] rounded hover:bg-[var(--color-secondary)]/10"
              >
                Logout
              </button>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="lego-button p-3 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 rounded-lg border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[var(--color-primary)]" />
              ) : (
                <Menu className="h-6 w-6 text-[var(--color-primary)]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="sm:hidden bg-[var(--color-card-bg)]/95 backdrop-blur-sm border-t border-[var(--color-border-light)]"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="px-4 py-3 space-y-4">
              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleDarkMode();
                  toggleMenu();
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-[var(--color-accent2)]" />
                ) : (
                  <Moon className="h-5 w-5 text-[var(--color-primary)]" />
                )}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {/* Profile Section */}
              <div className="pt-2 border-t border-[var(--color-border-light)]">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="h-10 w-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-medium">{user?.username || 'Trader'}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">View Profile</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    toggleMenu();
                    logout();
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 transition-colors mt-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

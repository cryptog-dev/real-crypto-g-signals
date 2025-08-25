import React, { useState, useContext, useEffect } from "react";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductApp from "./ProductApp";
import AuthModal from "./AuthModal";
import "./index.css";

const AppContent = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Show auth modal on initial load if user is not authenticated
    if (!loading && !user) {
      setShowAuthModal(true);
    }
  }, [user, loading]);

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  // Show loading state while checking auth status
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show the main app if user is authenticated
  if (user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar isAppView={true} />
        <main className="flex-grow">
          <ProductApp />
        </main>
        <Footer />
      </div>
    );
  }

  // Show the login page if user is not authenticated
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar isAppView={false} />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className={`p-8 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Crypto Signals</h1>
              <p className="text-gray-600 dark:text-gray-300">Please sign in to continue</p>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      </main>
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleCloseAuthModal} 
        initialMode="login"
      />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </ThemeProvider>
);

export default App;
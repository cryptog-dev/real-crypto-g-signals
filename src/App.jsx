import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductApp from "./ProductApp";
import AuthForm from "./components/AuthForm";
import { Sun, Moon } from "lucide-react";

const AppContent = () => {
  const { user } = useAuth();
  const { themeName, toggleTheme } = useContext(ThemeContext);

  // If user is not authenticated, show the auth form

  // Authenticated view
  if (user) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--color-background)]">
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={toggleTheme}
            className="lego-button p-2 bg-[var(--color-neutral-dark)]/50 hover:bg-[var(--color-primary)]/20 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg text-contrast-high transition-all duration-200"
            aria-label={`Switch to ${
              themeName === "Market Day" ? "Market Night" : "Market Day"
            } theme`}
          >
            {themeName === "Market Day" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>
        <Navbar />
        <main className="flex-grow">
          <ProductApp />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }
};

const App = () => <AppContent />;

export default App;

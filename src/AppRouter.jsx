import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import App from "./App";
import BlogDetail from "./pages/BlogDetail";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import TermsOfService from "./components/legal/TermsOfService";
import Disclaimer from "./components/legal/Disclaimer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import SignalDetail from "./pages/SignalDetail";
import Profile from "./components/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppRouter = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/signals/:id" element={<SignalDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AppRouter;

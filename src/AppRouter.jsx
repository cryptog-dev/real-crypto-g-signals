import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import BlogDetail from './pages/BlogDetail';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import Disclaimer from './components/legal/Disclaimer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import SignalDetail from './pages/SignalDetail';

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
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRouter;
